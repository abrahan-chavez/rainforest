using RainforestApi.Models;

namespace RainforestApi;

public class OrderService(ProductService productService, DatumService datumService)
{
    private readonly List<Order> _orders = [];
    private readonly string _stratumUrl = "stratum+tcp://mine.rainforrest.local:3333";
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
            User = $"worker_{orderId}",
            Password = _password,
            QuotedAcceptedSharePrice = product.PriceInAcceptedShares,
            AcceptedShares = 0
        };

        _orders.Add(order);

        return order;
    }

    public async Task<Order> GetOrder(string orderId)
    {
        var order = _orders.Single(o => o.OrderId == orderId);
        return order;
    }
}