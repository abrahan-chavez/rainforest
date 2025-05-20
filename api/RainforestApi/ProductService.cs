using Microsoft.AspNetCore.Http.HttpResults;
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
            PriceUSD = productRequest.PriceUsd,
            StockQuantity = productRequest.StockQuantity,
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
    
    public async Task SeedProducts(CancellationToken cancellationToken)
    {
        
        var products = new List<Product>
            {
                new Product
                {
                    Name             = "High-Five with the Devs",
                    Description      = "Personal high-five & photo op at Riot demo booth",
                    Image            = "https://source.unsplash.com/featured/?handshake",
                    ShippingRequired = false,
                    PriceUSD         = 1,
                    StockQuantity    = 100
                },
                new Product
                {
                    Name             = "Dinner with the Dev Team",
                    Description      = "Casual bite with two devs at Venetian Café",
                    Image            = "https://source.unsplash.com/featured/?dinner-table",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 4
                },
                new Product
                {
                    Name             = "NerdMiner",
                    Description      = "A NerdMiner device delivered in-person at the Riot Booth",
                    Image            = "https://source.unsplash.com/featured/?badge",
                    ShippingRequired = false,
                    PriceUSD         = 30,
                    StockQuantity    = 1
                },
                new Product
                {
                    Name             = "Riot Bucket Hat",
                    Description      = "BTC++ × Riot limited bucket hat; pick up at Riot booth swag table",
                    Image            = "https://source.unsplash.com/featured/?bucket-hat",
                    ShippingRequired = false,
                    PriceUSD         = 5,
                    StockQuantity    = 5
                },
                new Product
                {
                    Name             = "Code-Review Lightning Round",
                    Description      = "15-min one-on-one critique with a lead dev",
                    Image            = "https://source.unsplash.com/featured/?code-review",
                    ShippingRequired = false,
                    PriceUSD         = 5,
                    StockQuantity    = 25
                },
                new Product
                {
                    Name             = "Dev Karaoke Challenge",
                    Description      = "2-song face-off",
                    Image            = "https://source.unsplash.com/featured/?karaoke",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 5
                },
                new Product
                {
                    Name             = "Personalized CLI Alias",
                    Description      = "Your alias in our next release notes + photo",
                    Image            = "https://source.unsplash.com/featured/?terminal",
                    ShippingRequired = false,
                    PriceUSD         = 5,
                    StockQuantity    = 5
                },
                new Product
                {
                    Name             = "St. Mark’s Square Selfie",
                    Description      = "Piazza photo-op with devs",
                    Image            = "https://source.unsplash.com/featured/?piazza",
                    ShippingRequired = false,
                    PriceUSD         = 1,
                    StockQuantity    = 25
                },
                new Product
                {
                    Name             = "Crypto-Cocktails at Rosina",
                    Description      = "Devs buy you a signature cocktail at Rosina lounge",
                    Image            = "https://source.unsplash.com/featured/?cocktail",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 2
                },
                new Product
                {
                    Name             = "Morning Coffee with Devs",
                    Description      = "Espresso run before show opens",
                    Image            = "https://source.unsplash.com/featured/?coffee",
                    ShippingRequired = false,
                    PriceUSD         = 5,
                    StockQuantity    = 4
                }
            };
        
        context.Products.AddRange(products);
        await context.SaveChangesAsync(cancellationToken);
        
    }
}