using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateRouter : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RouterDeviceId",
                table: "LayerThreeNetwoks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LayerThreeNetwoks_RouterDeviceId",
                table: "LayerThreeNetwoks",
                column: "RouterDeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_LayerThreeNetwoks_RouterDevices_RouterDeviceId",
                table: "LayerThreeNetwoks",
                column: "RouterDeviceId",
                principalTable: "RouterDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LayerThreeNetwoks_RouterDevices_RouterDeviceId",
                table: "LayerThreeNetwoks");

            migrationBuilder.DropIndex(
                name: "IX_LayerThreeNetwoks_RouterDeviceId",
                table: "LayerThreeNetwoks");

            migrationBuilder.DropColumn(
                name: "RouterDeviceId",
                table: "LayerThreeNetwoks");
        }
    }
}
