using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RainforestApi.Migrations
{
    /// <inheritdoc />
    public partial class AddAcceptedHashes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<decimal>(
                name: "AcceptedHashes",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcceptedHashes",
                table: "Orders");
        }
    }
}
