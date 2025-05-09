namespace RainforestApi.Models;

public record Order
{
    public string ProductId { get; init; } = null!;
    public string OrderId { get; init; } = null!;

    public string EmailAddress { get; init; } = null!;
    public string FullName { get; init; } = null!;

    public string StreetAddress { get; init; } = null!;
    public string City { get; init; } = null!;
    public string State { get; init; } = null!;
    public string ZipCode { get; init; } = null!;
    public string Country { get; init; } = null!;

    public OrderStatus Status { get; init; }

    public required string StratumUrl { get; init; }
    public required string User { get; init; }
    public required string Password { get; init; }

    public decimal AcceptedShares { get; init; }
    public decimal QuotedAcceptedSharePrice { get; init; }
}

public enum OrderStatus
{
    Created,
    Processing,
    Shipped,
    Cancelled
}