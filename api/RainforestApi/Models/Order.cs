using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace RainforestApi.Models;

public record Order
{
    [Key] public Guid Id { get; init; }

    public Guid ProductId { get; init; }
    public Product Product { get; init; } = null!;

    public string EmailAddress { get; init; } = null!;
    public string FullName { get; init; } = null!;

    public string StreetAddress { get; init; } = null!;
    public string City { get; init; } = null!;
    public string State { get; init; } = null!;
    public string ZipCode { get; init; } = null!;
    public string Country { get; init; } = null!;

    [Column(TypeName = "text")] public OrderStatus Status { get; set; }

    public required string StratumUrl { get; init; }
    public required string WorkerName { get; init; }
    public required string Password { get; init; }

    public decimal QuotedAcceptedSharePrice { get; init; }

    public DatumResponse? MinerResponse { get; set; }

    public decimal Progress { get; set; }
}

public enum OrderStatus
{
    Created,
    Mining,
    Completed,
    Shipped,
}