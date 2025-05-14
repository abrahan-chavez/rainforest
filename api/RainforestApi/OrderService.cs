using RainforestApi.Models;

namespace RainforestApi;

public class OrderService(ProductService productService)
{
    private readonly List<Order> _orders = [];
    private readonly string _stratumUrl = "stratum+tcp://localhost:8080";
    private readonly string _password = "x";

    public Order[] GetOrders()
    {
        return _orders.ToArray();
    }

    public Order CreateOrder(OrderRequest orderRequest)
    {
        var product = productService.GetProduct(orderRequest.ProductId);

        if (product == null)
        {
            throw new ArgumentException($"Product with ID {orderRequest.ProductId} not found.");
        }

        var orderId = Guid.NewGuid().ToString("N");
        var order = new Order
        {
            ProductId = product.ProductId,
            OrderId = $"order_{orderId}",
            EmailAddress = orderRequest.EmailAddress,
            FullName = orderRequest.FullName,
            StreetAddress = orderRequest.StreetAddress,
            City = orderRequest.City,
            State = orderRequest.State,
            ZipCode = orderRequest.ZipCode,
            Country = orderRequest.Country,
            Status = OrderStatus.Created,
            StratumUrl = _stratumUrl,
            WorkerName = $"worker_{orderId}",
            Password = _password,
            QuotedAcceptedSharePrice = product.PriceInAcceptedShares,
        };

        _orders.Add(order);

        return order;
    }

    public void UpdateOrderProgress(DatumResponse datumResponse)
    {
        var order = _orders.SingleOrDefault(o => o.WorkerName == datumResponse.Username);
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

        _orders.RemoveAll(o => o.WorkerName == datumResponse.Username);
        _orders.Add(order);
    }

    public Order GetOrder(string orderId)
    {
        var order = _orders.Single(o => o.OrderId == orderId);
        return order;
    }
}