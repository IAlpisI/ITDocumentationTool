using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class hostAddressupdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_PrinterId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_SwitchDeviceId",
                table: "HostAddresses");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_PrinterId",
                table: "HostAddresses",
                column: "PrinterId",
                unique: true,
                filter: "[PrinterId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses",
                column: "RouterDeviceId",
                unique: true,
                filter: "[RouterDeviceId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_SwitchDeviceId",
                table: "HostAddresses",
                column: "SwitchDeviceId",
                unique: true,
                filter: "[SwitchDeviceId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_PrinterId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_SwitchDeviceId",
                table: "HostAddresses");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_PrinterId",
                table: "HostAddresses",
                column: "PrinterId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses",
                column: "RouterDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_SwitchDeviceId",
                table: "HostAddresses",
                column: "SwitchDeviceId");
        }
    }
}
