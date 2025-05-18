using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace RainforestApi.Models;

public record DatumResponse
{
    [JsonPropertyName("thread")] public int Thread { get; init; }

    [JsonPropertyName("cid")] public int Cid { get; init; }

    [JsonPropertyName("host")] public string Host { get; init; } = null!;

    [Key] [JsonPropertyName("username")] public string Username { get; init; } = null!;

    [JsonPropertyName("useragent")] public string UserAgent { get; init; } = null!;

    [JsonPropertyName("subscribed")] public bool Subscribed { get; init; }

    [JsonPropertyName("subscribe_secs")] public double SubscribeSecs { get; init; }

    [JsonPropertyName("diff")] public int Difficulty { get; init; }

    [JsonPropertyName("accepted_diff")] public int AcceptedDiff { get; init; }

    [JsonPropertyName("rejected_diff")] public int RejectedDiff { get; init; }

    [JsonPropertyName("accepted_shares")] public int AcceptedShares { get; init; }

    [JsonPropertyName("rejected_shares")] public int RejectedShares { get; init; }

    [JsonPropertyName("hashrate_ths")] public double HashrateTerahashesPerSecond { get; init; }
}