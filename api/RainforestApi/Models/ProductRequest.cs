namespace RainforestApi.Models;

public record ProductRequest
{
    public string Name { get; init; } = null!;
    public string? Description { get; init; } = null!;
    public string? Image { get; init; } = null!;
    public bool ShippingRequired { get; init; }

    public decimal PriceUsd { get; init; }
    public int StockQuantity { get; set; }
}