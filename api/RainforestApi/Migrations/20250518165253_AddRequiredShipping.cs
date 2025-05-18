using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RainforestApi.Migrations
{
    /// <inheritdoc />
    public partial class AddRequiredShipping : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ShippingRequired",
                table: "Products",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShippingRequired",
                table: "Products");
        }
    }
}
