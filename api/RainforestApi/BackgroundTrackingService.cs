namespace RainforestApi;

public class BackgroundTrackingService(
    ILogger<BackgroundTrackingService> logger,
    IServiceScopeFactory serviceScopeFactory,
    DatumService datumService) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            logger.LogInformation("Background tracking service is running at: {time}", DateTimeOffset.Now);
            await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);

            try
            {
                var responses = await datumService.GetMiners(stoppingToken);

                if (responses.Length == 0)
                {
                    continue;
                }

                await using var scope = serviceScopeFactory.CreateAsyncScope();
                
                var orderService = scope.ServiceProvider.GetRequiredService<OrderService>();

                foreach (var response in responses)
                {
                    try
                    {
                        await orderService.UpdateOrderProgress(response, stoppingToken);
                    }
                    catch (Exception e)
                    {
                        logger.LogWarning(e, "Failed to update order progress for miner {miner}", response.Username);
                    }
                }
            }
            catch (Exception e)
            {
                logger.LogError(e, "An error occurred while fetching miners data.");
            }
        }
    }
}