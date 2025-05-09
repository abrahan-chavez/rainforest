namespace RainforestApi.Models;

public record Product
{
    public string ProductId { get; init; } = null!;
    public string Name { get; init; } = null!;
    public string? Description { get; init; } = null!;
    public string? Image { get; init; } = null!;

    public decimal PriceInAcceptedShares { get; init; }
    public decimal PriceUSD => PriceInAcceptedShares / 10_000;
}