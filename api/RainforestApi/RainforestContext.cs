using Microsoft.EntityFrameworkCore;
using RainforestApi.Models;

namespace RainforestApi;

public sealed class RainforestContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }

    private string DbPath { get; }

    public RainforestContext()
    {
        var path = Environment.CurrentDirectory;
        DbPath = System.IO.Path.Join(path, "rainforest.db");
        Database.Migrate();
    }

    // The following configures EF to create a Sqlite database file in the
    // special "local" folder for your platform.
    protected override void OnConfiguring(DbContextOptionsBuilder options)
        => options.UseSqlite($"Data Source={DbPath}");
}