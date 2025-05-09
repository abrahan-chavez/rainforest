using RainforestApi;
using RainforestApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

var orderService = new OrderService();

app.MapGet("/orders", () =>
    {
        var orders = orderService.GetOrders();
        return orders;
    })
    .WithName("GetOrders")
    .WithOpenApi();

app.MapPost("/orders/", (OrderRequest request) =>
    {
        var order = orderService.CreateOrder(request);
        return order;
    })
    .WithName("CreateOrder")
    .WithOpenApi();

app.MapGet("/orders/{orderId}", (string orderId) =>
    {
        var order = orderService.GetOrder(orderId);
        return order;
    })
    .WithName("GetOrder")
    .WithOpenApi();

app.Run();