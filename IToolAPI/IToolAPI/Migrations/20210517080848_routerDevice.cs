using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class routerDevice : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses",
                column: "RouterDeviceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses",
                column: "RouterDeviceId",
                unique: true,
                filter: "[RouterDeviceId] IS NOT NULL");
        }
    }
}
