using Microsoft.EntityFrameworkCore;
using RainforestApi.Models;

namespace RainforestApi;

public class ProductService(RainforestContext context)
{
    public async Task<Product[]> GetProducts(CancellationToken cancellationToken)
    {
        return await context.Products
            .ToArrayAsync(cancellationToken);
    }

    public async Task<Product> CreateProduct(ProductRequest productRequest, CancellationToken cancellationToken)
    {
        var product = new Product
        {
            Name = productRequest.Name,
            Description = productRequest.Description,
            Image = productRequest.Image,
            ShippingRequired = productRequest.ShippingRequired,
            PriceInAcceptedShares = productRequest.PriceInAcceptedShares
        };

        context.Products.Add(product);
        await context.SaveChangesAsync(cancellationToken);
        return product;
    }

    public async Task ChangeProductActivationStatus(Guid productId, bool isActive, CancellationToken cancellationToken)
    {
        var product = await context.Products.SingleAsync(p => p.Id == productId, cancellationToken);
        product.IsActive = isActive;
        context.Products.Update(product);
        await context.SaveChangesAsync(cancellationToken);
    }

    public async Task<Product?> GetProduct(Guid productId, CancellationToken cancellationToken)
    {
        return await context.Products.SingleOrDefaultAsync(p => p.Id == productId, cancellationToken);
    }
}