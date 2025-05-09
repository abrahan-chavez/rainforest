namespace RainforestApi;

public class BackgroundTrackingService(ILogger<BackgroundTrackingService> logger, DatumService datumService, OrderService orderService) : BackgroundService
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

                foreach (var response in responses)
                {
                    try
                    {
                        orderService.UpdateOrderProgress(response);
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