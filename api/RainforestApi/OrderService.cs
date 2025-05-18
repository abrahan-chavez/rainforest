using Microsoft.EntityFrameworkCore;
using RainforestApi.Models;

namespace RainforestApi;

public class OrderService(ProductService productService, RainforestContext dbContext)
{
    private readonly string _stratumUrl = "stratum+tcp://localhost:8080";
    private readonly string _password = "x";

    public async Task<Order[]> GetOrders(CancellationToken cancellationToken)
    {
        return await dbContext.Orders
            .Include(o => o.Product)
            .ToArrayAsync(cancellationToken);
    }

    public async Task<Order> CreateOrder(OrderRequest orderRequest, CancellationToken cancellationToken)
    {
        var product = await productService.GetProduct(orderRequest.ProductId, cancellationToken);

        if (product == null || product.IsActive == false)
        {
            throw new ArgumentException($"Product with ID {orderRequest.ProductId} not found.");
        }

        var workerName = Guid.NewGuid().ToString("N");
        var order = new Order
        {
            ProductId = product.Id,
            EmailAddress = orderRequest.EmailAddress,
            FullName = orderRequest.FullName,
            StreetAddress = orderRequest.StreetAddress,
            City = orderRequest.City,
            State = orderRequest.State,
            ZipCode = orderRequest.ZipCode,
            Country = orderRequest.Country,
            Status = OrderStatus.Created,
            StratumUrl = _stratumUrl,
            WorkerName = $"worker.{workerName}",
            Password = _password,
            QuotedAcceptedSharePrice = product.PriceInAcceptedShares,
        };

        dbContext.Orders.Add(order);
        await dbContext.SaveChangesAsync(cancellationToken);
        return order;
    }
    
    public async Task MarkOrderAsShipped(Guid orderId, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders.SingleOrDefaultAsync(o => o.Id == orderId, cancellationToken);
        if (order == null)
        {
            throw new ArgumentException($"Order with ID {orderId} not found.");
        }

        order.Status = OrderStatus.Shipped;
        dbContext.Orders.Update(order);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task UpdateOrderProgress(DatumResponse datumResponse, CancellationToken cancellationToken)
    {
        var order = await dbContext.Orders.SingleOrDefaultAsync(o => o.WorkerName == datumResponse.Username,
            cancellationToken);
        if (order == null)
        {
            throw new ArgumentException($"Order with username {datumResponse.Username} not found.");
        }

        order.MinerResponse = datumResponse;
        var totalShares = (datumResponse.AcceptedShares + datumResponse.RejectedShares);

        if (totalShares > 0 && totalShares < order.QuotedAcceptedSharePrice)
        {
            order.Status = OrderStatus.Mining;
        }
        else if (totalShares >= order.QuotedAcceptedSharePrice)
        {
            order.Status = OrderStatus.Completed;
        }

        order.Progress = totalShares / order.QuotedAcceptedSharePrice;
        dbContext.Orders.Update(order);
        await dbContext.SaveChangesAsync(cancellationToken);
    }

    public async Task<Order?> GetOrder(Guid orderId, CancellationToken cancellationToken)
    {
        return await dbContext.Orders.Include(o => o.Product).Include(o => o.MinerResponse)
            .SingleOrDefaultAsync(o => o.Id == orderId, cancellationToken);
    }
}