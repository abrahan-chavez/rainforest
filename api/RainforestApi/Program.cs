using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using RainforestApi;
using RainforestApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<OrderService>();
builder.Services.AddSingleton<ProductService>();
builder.Services.AddHttpClient<DatumService>()
    .ConfigureHttpClient(client =>
    {
        client.BaseAddress = new Uri("http://datum:8080");
        var credentials = Convert.ToBase64String("admin:demo"u8.ToArray());
        client.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Basic", credentials);
    });
builder.Services.AddHostedService<BackgroundTrackingService>();

builder.Services.AddProblemDetails();

builder.Services.Configure<JsonOptions>(o => o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.MapGet("/orders", () =>
    {
        var orderService = app.Services.GetRequiredService<OrderService>();
        return orderService.GetOrders();
    })
    .WithName("GetOrders")
    .WithOpenApi();

app.MapPost("/orders/", (OrderRequest request) =>
    {
        var orderService = app.Services.GetRequiredService<OrderService>();
        var order = orderService.CreateOrder(request);
        return order;
    })
    .WithName("CreateOrder")
    .WithOpenApi();

app.MapGet("/orders/{orderId}", (string orderId) =>
    {
        var orderService = app.Services.GetRequiredService<OrderService>();
        var order = orderService.GetOrder(orderId);
        return order;
    })
    .WithName("GetOrder")
    .WithOpenApi();

app.MapGet("/products", () =>
    {
        var productService = app.Services.GetRequiredService<ProductService>();
        return productService.GetProducts();
    })
    .WithName("GetProducts")
    .WithOpenApi();

app.MapPost("/products/", (ProductRequest request) =>
    {
        var productService = app.Services.GetRequiredService<ProductService>();
        var product = productService.CreateProduct(request);
        return product;
    })
    .WithName("CreateProduct")
    .WithOpenApi();

app.MapGet("/products/{productId}", (string productId) =>
    {
        var productService = app.Services.GetRequiredService<ProductService>();
        var product = productService.GetProduct(productId);
        return product;
    })
    .WithName("GetProduct")
    .WithOpenApi();

app.Run();