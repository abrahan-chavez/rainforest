using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;
using RainforestApi;
using RainforestApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<RainforestContext>(options =>
{
    options.ConfigureWarnings(w => w.Ignore(RelationalEventId.PendingModelChangesWarning));
});
builder.Services.AddScoped<OrderService>();
builder.Services.AddScoped<ProductService>();
builder.Services.AddHttpClient<HashRateConversionService>();
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
builder.Services.AddLogging();

builder.Services.Configure<JsonOptions>(o => o.SerializerOptions.Converters.Add(new JsonStringEnumConverter()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();
app.UseHttpsRedirection();

app.MapGet("/", () => "Hello from Rainforest API!");

app.MapGet("/orders",
        async (OrderService orderService, CancellationToken cancellationToken) =>
            await orderService.GetOrders(cancellationToken))
    .WithName("GetOrders")
    .WithOpenApi();

app.MapPost("/orders",
        async (OrderRequest request, OrderService orderService, CancellationToken cancellationToken) =>
            await orderService.CreateOrder(request, cancellationToken))
    .WithName("CreateOrder")
    .WithOpenApi();

app.MapGet("/orders/{orderId:guid}",
        async (Guid orderId, OrderService orderService, CancellationToken cancellationToken) =>
        {
            var order = await orderService.GetOrder(orderId, cancellationToken);
            return order == null ? Results.NotFound() : Results.Ok(order);
        })
    .WithName("GetOrder")
    .WithOpenApi();

app.MapPost("/orders/{orderId:guid}/ship",
        async (Guid orderId, OrderService orderService, CancellationToken cancellationToken) =>
        {
            await orderService.MarkOrderAsShipped(orderId, cancellationToken);
        })
    .WithName("MarkOrderShipped")
    .WithOpenApi();

app.MapGet("/products",
        async (ProductService productService, CancellationToken cancellationToken) =>
            await productService.GetProducts(cancellationToken))
    .WithName("GetProducts")
    .WithOpenApi();

app.MapPost("/products",
        async (ProductRequest request, ProductService productService, CancellationToken cancellationToken) =>
            await productService.CreateProduct(request, cancellationToken))
    .WithName("CreateProduct")
    .WithOpenApi();

app.MapGet("/products/{productId:guid}",
        async (Guid productId, ProductService productService, CancellationToken cancellationToken) =>
            await productService.GetProduct(productId, cancellationToken))
    .WithName("GetProduct")
    .WithOpenApi();

app.MapPost("/products/{productId:guid}/deactivate",
        async (Guid productId, ProductService productService, CancellationToken cancellationToken) =>
            await productService.ChangeProductActivationStatus(productId, false, cancellationToken))
    .WithName("DeactivateProduct")
    .WithOpenApi();

app.MapPost("/products/{productId:guid}/activate",
        async (Guid productId, ProductService productService, CancellationToken cancellationToken) =>
            await productService.ChangeProductActivationStatus(productId, true, cancellationToken))
    .WithName("ActivateProduct")
    .WithOpenApi();

app.MapGet("utilities/hashprice",
    async (HashRateConversionService hashRateConversionService, CancellationToken cancellationToken) =>
        await hashRateConversionService.GetHashPrice(cancellationToken));

app.MapPost("/admin/clear",
    async (RainforestContext dbContext, CancellationToken cancellationToken) =>
    {
        await using var transaction = await dbContext.Database.BeginTransactionAsync(cancellationToken);
        var orders = await dbContext.Orders.ToArrayAsync(cancellationToken);
        dbContext.Orders.RemoveRange(orders);
        var products = await dbContext.Products.ToArrayAsync(cancellationToken);
        dbContext.Products.RemoveRange(products);
        await dbContext.SaveChangesAsync(cancellationToken);
        transaction.Commit();
        return Results.NoContent();
    });

app.MapPost("/admin/migrate",
    async (RainforestContext dbContext, CancellationToken cancellationToken) =>
    {
        await dbContext.Database.MigrateAsync(cancellationToken);
    });

app.Run();