using RainforestApi.Models;

namespace RainforestApi;

public class ProductService
{
    private readonly List<Product> _products = [];

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
            ImageUrl = productRequest.ImageUrl,
            PriceInAcceptedShares = productRequest.PriceInAcceptedShares
        };

        _products.Add(product);

        return product;
    }

    public Product? GetProduct(string productId)
    {
        return _products.SingleOrDefault(p => p.ProductId == productId);
    }
}