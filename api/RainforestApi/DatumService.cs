using RainforestApi.Models;

namespace RainforestApi;

public class DatumService(HttpClient httpClient)
{
    public async Task<DatumResponse[]> GetMiners(CancellationToken cancellation)
    {
        var response = await httpClient.GetFromJsonAsync<DatumResponse[]>(
            "http://datum:8080/api/clients.json",
            cancellationToken: cancellation);

        if (response == null)
        {
            throw new ApplicationException("Failed to fetch miners data.");
        }

        return response;
    }

    public async Task<DatumResponse?> GetMiner(string workerName, CancellationToken cancellation)
    {
        var workers = await GetMiners(cancellation);
        var worker = workers.SingleOrDefault(w => w.Username == workerName);

        return worker;
    }
}