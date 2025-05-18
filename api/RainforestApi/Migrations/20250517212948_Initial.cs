using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RainforestApi.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DatumResponse",
                columns: table => new
                {
                    Username = table.Column<string>(type: "TEXT", nullable: false),
                    Thread = table.Column<int>(type: "INTEGER", nullable: false),
                    Cid = table.Column<int>(type: "INTEGER", nullable: false),
                    Host = table.Column<string>(type: "TEXT", nullable: false),
                    UserAgent = table.Column<string>(type: "TEXT", nullable: false),
                    Subscribed = table.Column<bool>(type: "INTEGER", nullable: false),
                    SubscribeSecs = table.Column<double>(type: "REAL", nullable: false),
                    Difficulty = table.Column<int>(type: "INTEGER", nullable: false),
                    AcceptedDiff = table.Column<int>(type: "INTEGER", nullable: false),
                    RejectedDiff = table.Column<int>(type: "INTEGER", nullable: false),
                    AcceptedShares = table.Column<int>(type: "INTEGER", nullable: false),
                    RejectedShares = table.Column<int>(type: "INTEGER", nullable: false),
                    HashrateTerahashesPerSecond = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DatumResponse", x => x.Username);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Image = table.Column<string>(type: "TEXT", nullable: true),
                    PriceInAcceptedShares = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ProductId = table.Column<Guid>(type: "TEXT", nullable: false),
                    EmailAddress = table.Column<string>(type: "TEXT", nullable: false),
                    FullName = table.Column<string>(type: "TEXT", nullable: false),
                    StreetAddress = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    State = table.Column<string>(type: "TEXT", nullable: false),
                    ZipCode = table.Column<string>(type: "TEXT", nullable: false),
                    Country = table.Column<string>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "text", nullable: false),
                    StratumUrl = table.Column<string>(type: "TEXT", nullable: false),
                    WorkerName = table.Column<string>(type: "TEXT", nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false),
                    QuotedAcceptedSharePrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    MinerResponseUsername = table.Column<string>(type: "TEXT", nullable: true),
                    Progress = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_DatumResponse_MinerResponseUsername",
                        column: x => x.MinerResponseUsername,
                        principalTable: "DatumResponse",
                        principalColumn: "Username");
                    table.ForeignKey(
                        name: "FK_Orders_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MinerResponseUsername",
                table: "Orders",
                column: "MinerResponseUsername");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_ProductId",
                table: "Orders",
                column: "ProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "DatumResponse");

            migrationBuilder.DropTable(
                name: "Products");
        }
    }
}
