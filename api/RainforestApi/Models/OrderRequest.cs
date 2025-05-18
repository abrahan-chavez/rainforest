namespace RainforestApi.Models;

public class OrderRequest
{
    public Guid ProductId { get; init; }

    public string EmailAddress { get; init; } = null!;
    public string FullName { get; init; } = null!;

    public string StreetAddress { get; init; } = null!;
    public string City { get; init; } = null!;
    public string State { get; init; } = null!;
    public string ZipCode { get; init; } = null!;
    public string Country { get; init; } = null!;
}