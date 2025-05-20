using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RainforestApi.Migrations
{
    /// <inheritdoc />
    public partial class AddHashPrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PriceInAcceptedShares",
                table: "Products",
                newName: "PriceUSD");

            migrationBuilder.RenameColumn(
                name: "QuotedAcceptedSharePrice",
                table: "Orders",
                newName: "QuotedAcceptedHashes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PriceUSD",
                table: "Products",
                newName: "PriceInAcceptedShares");

            migrationBuilder.RenameColumn(
                name: "QuotedAcceptedHashes",
                table: "Orders",
                newName: "QuotedAcceptedSharePrice");
        }
    }
}
