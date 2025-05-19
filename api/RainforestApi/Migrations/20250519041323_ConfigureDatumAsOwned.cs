using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RainforestApi.Migrations
{
    /// <inheritdoc />
    public partial class ConfigureDatumAsOwned : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_DatumResponse_MinerResponseUsername",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_MinerResponseUsername",
                table: "Orders");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DatumResponse",
                table: "DatumResponse");

            migrationBuilder.DropColumn(
                name: "MinerResponseUsername",
                table: "Orders");

            migrationBuilder.AddColumn<Guid>(
                name: "OrderId",
                table: "DatumResponse",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_DatumResponse",
                table: "DatumResponse",
                column: "OrderId");

            migrationBuilder.AddForeignKey(
                name: "FK_DatumResponse_Orders_OrderId",
                table: "DatumResponse",
                column: "OrderId",
                principalTable: "Orders",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DatumResponse_Orders_OrderId",
                table: "DatumResponse");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DatumResponse",
                table: "DatumResponse");

            migrationBuilder.DropColumn(
                name: "OrderId",
                table: "DatumResponse");

            migrationBuilder.AddColumn<string>(
                name: "MinerResponseUsername",
                table: "Orders",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DatumResponse",
                table: "DatumResponse",
                column: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_MinerResponseUsername",
                table: "Orders",
                column: "MinerResponseUsername");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_DatumResponse_MinerResponseUsername",
                table: "Orders",
                column: "MinerResponseUsername",
                principalTable: "DatumResponse",
                principalColumn: "Username");
        }
    }
}
