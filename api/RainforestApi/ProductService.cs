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

    public async Task<Product> UpdateProduct(Guid productId, ProductRequest productRequest, CancellationToken cancellationToken)
    {
        var product = await context.Products.SingleAsync(p => p.Id == productId, cancellationToken);
        product.Name = productRequest.Name;
        product.Description = productRequest.Description;
        product.Image = productRequest.Image;
        product.ShippingRequired = productRequest.ShippingRequired;
        product.PriceUSD = productRequest.PriceUsd;
        product.StockQuantity = productRequest.StockQuantity;

        context.Products.Update(product);
        await context.SaveChangesAsync(cancellationToken);
        return product;
    }
    
    public async Task SeedProducts(CancellationToken cancellationToken)
    {
        
        var products = new List<Product>
            {
                new Product
                {
                    Name             = "High-Five with the Devs",
                    Description      = "Personal high-five & photo op at Riot demo booth",
                    Image            = "rainforest/five.png",
                    ShippingRequired = false,
                    PriceUSD         = 1,
                    StockQuantity    = 100
                },
                new Product
                {
                    Name             = "Dinner with the Dev Team",
                    Description      = "Casual bite with two devs at Venetian Café",
                    Image            = "rainforest/dinner.png",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 2
                },
                new Product
                {
                    Name             = "NerdMiner",
                    Description      = "A NerdMiner device delivered in-person at the Riot Booth",
                    Image            = "https://m.media-amazon.com/images/I/51tbySoSVYL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
                    ShippingRequired = false,
                    PriceUSD         = 30,
                    StockQuantity    = 1
                },
                new Product
                {
                    Name             = "Code-Review Lightning Round",
                    Description      = "15-min one-on-one critique with a lead dev",
                    Image            = "rainforest/code.png",
                    ShippingRequired = false,
                    PriceUSD         = 5,
                    StockQuantity    = 25
                },
                new Product
                {
                    Name             = "Dev Karaoke Challenge",
                    Description      = "2-song face-off",
                    Image            = "rainforest/karaoke.png",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 5
                },
                new Product
                {
                    Name             = "Memorialized in the CLI",
                    Description      = "Your alias in our next release notes",
                    Image            = "rainforest/cli.png",
                    ShippingRequired = false,
                    PriceUSD         = 5,
                    StockQuantity    = 5
                },
                new Product
                {
                    Name             = "Selfie by the Gondola with a Dev",
                    Description      = "Photo-op with devs, gondola ride not included",
                    Image            = "rainforest/gondola.png",
                    ShippingRequired = false,
                    PriceUSD         = 1,
                    StockQuantity    = 25
                },
                new Product
                {
                    Name             = "Crypto-Cocktails at Venetian",
                    Description      = "Devs buy you a signature cocktail at the Venetian lounge",
                    Image            = "rainforest/cocktails.png",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 2
                },
                new Product
                {
                    Name             = "Morning Coffee with Devs",
                    Description      = "Espresso run before show opens",
                    Image            = "/rainforest/coffee.png",
                    ShippingRequired = false,
                    PriceUSD         = 10,
                    StockQuantity    = 4
                },
                new Product
                {
                    Name             = "One Hand of Black Jack ($25 value)",
                    Description      = "Play a hand of blackjack with a dev at the Venetian Casino",
                    Image            = "/rainforest/blackjack.png",
                    ShippingRequired = false,
                    PriceUSD         = 15,
                    StockQuantity    = 1
                }
            };
        
        context.Products.AddRange(products);
        await context.SaveChangesAsync(cancellationToken);
        
    }
}