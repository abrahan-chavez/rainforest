namespace RainforestApi;

public class HashRateConversionService(HttpClient httpClient)
{
    public async Task<decimal> GetUsdPerHash(CancellationToken cancellationToken)
    {
        var response = await GetLuxResponse(cancellationToken);
        var usdPerBitcoin = 100_000m;
        var blockRewards = response.Data.CoinbaseRewards24h;
        var difficulty = response.Data.NetworkDiff;
        return ComputeUsdPerHash(difficulty, blockRewards, usdPerBitcoin);
    }
    
    public async Task<decimal> GetHashPrice(CancellationToken cancellationToken)
    {
        var response = await GetLuxResponse(cancellationToken);
        return response.Data.HashpriceUsd;
    }
    
    private async Task<LuxResponse> GetLuxResponse(CancellationToken cancellationToken)
    {
        var response =
            await httpClient.GetFromJsonAsync<LuxResponse>(
                "https://data.hashrateindex.com/hi-api/hashrateindex/network/overview", cancellationToken);
        return response!;
    }
    
    private static decimal ComputeUsdPerHash(double difficulty, decimal blockRewards, decimal usdPerBitcoin)
    {
        var usdPerBlock = blockRewards * usdPerBitcoin; // (BTC / Block) * (USD / BTC) = USD / Block
        var tenMinutes = TimeSpan.FromMinutes(10);

        var difficultyInferredNetworkHashRate = difficulty * Math.Pow(2, 32) / tenMinutes.TotalSeconds;

        var expectedHashesPerBlock = difficultyInferredNetworkHashRate * tenMinutes.TotalSeconds;
        var expectedBlocksPerHash = 1 / (decimal)expectedHashesPerBlock;

        return usdPerBlock * expectedBlocksPerHash; // (USD / Block) * (Blocks / Hash) = USD per Hash.
    }

    private record LuxResponse
    {
        public string Schema { get; init; }
        public NetworkOverviewData Data { get; init; }

        public record NetworkOverviewData
        {
            public string Timestamp { get; set; }
            public double Marketcap { get; set; }
            public decimal HashpriceUsd { get; set; }
            public double NetworkHashrate7d { get; set; }
            public double NetworkDiff { get; set; }
            public decimal CoinbaseRewards24h { get; set; }
            public double FeesBlocks24h { get; set; }
            public double TxRateAvg7d { get; set; }
            public string NextHalvingDate { get; set; }
            public int NextHalvingCount { get; set; }
            public double EstDiffAdj { get; set; }
            public int AvgBlockTime { get; set; }
            public int BlocksToAdj { get; set; }
            public string EstDiffAdjDate { get; set; }
        }
    }
}