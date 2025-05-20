using System.ComponentModel.DataAnnotations;

namespace RainforestApi.Models;

public record Product
{
    [Key] public Guid Id { get; init; }

    public string Name { get; init; } = null!;
    public string? Description { get; init; } = null!;
    public string? Image { get; init; } = null!;

    public bool ShippingRequired { get; init; }

    public decimal PriceUSD { get; init; }

    public bool IsActive { get; set; } = true;
    
    public int StockQuantity { get; set; }
}