using System.ComponentModel.DataAnnotations;

namespace RainforestApi.Models;

public record Product
{
    [Key] public Guid Id { get; init; }

    public string Name { get; set; } = null!;
    public string? Description { get; set; } = null!;
    public string? Image { get; set; } = null!;

    public bool ShippingRequired { get; set; }

    public decimal PriceUSD { get; set; }

    public bool IsActive { get; set; } = true;
    
    public int StockQuantity { get; set; }
}