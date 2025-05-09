namespace RainforestApi.Models;

public record ProductRequest
{
    public string Name { get; init; } = null!;
    public string? Description { get; init; } = null!;
    public string? ImageUrl { get; init; } = null!;

    public decimal PriceInShares { get; init; }
}