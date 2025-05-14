using RainforestApi.Models;

namespace RainforestApi;

public class ProductService
{
    private readonly List<Product> _products = [];

    public ProductService()
    {
        InjectMockProducts();
    }

    public Product[] GetProducts()
    {
        return _products.ToArray();
    }

    public Product CreateProduct(ProductRequest productRequest)
    {
        var productId = Guid.NewGuid().ToString("N");
        var product = new Product
        {
            ProductId = $"product_{productId}",
            Name = productRequest.Name,
            Description = productRequest.Description,
            Image = productRequest.Image,
            PriceInAcceptedShares = productRequest.PriceInAcceptedShares
        };

        _products.Add(product);

        return product;
    }

    public Product? GetProduct(string productId)
    {
        return _products.SingleOrDefault(p => p.ProductId == productId);
    }

    private void InjectMockProducts()
    {
        var products = new List<Product>
        {
            new()
            {
                ProductId = "prod_1",
                Name = "Limited Edition Rainforrest T-Shirt",
                Description =
                    "Soft cotton t-shirt featuring the Rainforrest logo. Perfect for showing off your mining prowess.",
                PriceInAcceptedShares = 250000,
                Image =
                    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            },
            new()
            {
                ProductId = "prod_2",
                Name = "Crypto Mining Sticker Pack",
                Description = "A set of 5 high-quality vinyl stickers with mining-themed designs.",
                PriceInAcceptedShares = 100,
                Image =
                    "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            },
            new()
            {
                ProductId = "prod_3",
                Name = "Rainforest Coffee Mug",
                Description =
                    "Ceramic mug perfect for those long mining sessions. Holds 12oz of your favorite beverage.",
                PriceInAcceptedShares = 1500,
                Image =
                    "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            },
            new()
            {
                ProductId = "prod_4",
                Name = "Proof-of-Work Hoodie",
                Description =
                    "Stay warm while you mine with this comfortable hoodie featuring a unique blockchain design.",
                PriceInAcceptedShares = 450000,
                Image =
                    "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            },
            new()
            {
                ProductId = "prod_5",
                Name = "Mining Hardware Toolkit",
                Description =
                    "Essential tools for maintaining your mining rigs, includes screwdrivers, thermal paste, and cable ties.",
                PriceInAcceptedShares = 350000,
                Image =
                    "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            },
            new()
            {
                ProductId = "prod_6",
                Name = "Blockchain Notebook",
                Description =
                    "Premium hardcover notebook for jotting down your crypto ideas and mining strategies.",
                PriceInAcceptedShares = 12000,
                Image =
                    "https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
            }
        };

        _products.AddRange(products);
    }
}