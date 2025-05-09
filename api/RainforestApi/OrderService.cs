using RainforestApi.Models;

namespace RainforestApi;

public class OrderService
{
    private readonly List<Order> _orders = [];
    private readonly string _stratumUrl = "stratum+tcp://mine.rainforrest.local:3333";
    private readonly string _password = "x";
    
    public List<Order> GetOrders()
    {
        return _orders;
    }
    
    public Order CreateOrder(OrderRequest orderRequest)
    {
        var orderId = Guid.NewGuid().ToString("N");
        var order = new Order
        {
            ProductId = orderRequest.ProductId,
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
            OrderProgress = 0
        };

        _orders.Add(order);

        return order;
    }
    
    public Order GetOrder(string orderId)
    {
        return _orders.Single(o => o.OrderId == orderId);
    }
}