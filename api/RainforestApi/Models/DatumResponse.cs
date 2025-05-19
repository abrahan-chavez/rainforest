using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RainforestApi.Models;

public record DatumResponse
{
    public Guid OrderId { get; init; }
    public Order? Order { get; init; }

    [JsonPropertyName("thread")] public int Thread { get; set; }

    [JsonPropertyName("cid")] public int Cid { get; set; }

    [JsonPropertyName("host")] public string Host { get; set; } = null!;
    [JsonPropertyName("username")] public string Username { get; set; } = null!;

    [JsonPropertyName("useragent")] public string UserAgent { get; set; } = null!;

    [JsonPropertyName("subscribed")] public bool Subscribed { get; set; }

    [JsonPropertyName("subscribe_secs")] public double SubscribeSecs { get; set; }

    [JsonPropertyName("diff")] public int Difficulty { get; set; }

    [JsonPropertyName("accepted_diff")] public int AcceptedDiff { get; set; }

    [JsonPropertyName("rejected_diff")] public int RejectedDiff { get; set; }

    [JsonPropertyName("accepted_shares")] public int AcceptedShares { get; set; }

    [JsonPropertyName("rejected_shares")] public int RejectedShares { get; set; }

    [JsonPropertyName("hashrate_ths")] public double HashrateTerahashesPerSecond { get; set; }
}