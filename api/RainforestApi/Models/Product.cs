namespace RainforestApi.Models;

public record Product
{
    public string ProductId { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string? Description { get; init; } = null!;
    public string? ImageUrl { get; init; } = null!;

    public decimal PriceInAcceptedShares { get; init; }
}