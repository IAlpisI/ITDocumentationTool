using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateServerwithhostaddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.AddColumn<int>(
                name: "ServerDeviceId",
                table: "DevicePorts",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ServerDeviceId",
                table: "HostAddresses",
                column: "ServerDeviceId",
                unique: true,
                filter: "[ServerDeviceId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_DevicePorts_ServerDeviceId",
                table: "DevicePorts",
                column: "ServerDeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_DevicePorts_serverDevices_ServerDeviceId",
                table: "DevicePorts",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DevicePorts_serverDevices_ServerDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_DevicePorts_ServerDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropColumn(
                name: "ServerDeviceId",
                table: "DevicePorts");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ServerDeviceId",
                table: "HostAddresses",
                column: "ServerDeviceId");
        }
    }
}
