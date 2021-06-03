using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateServerwithhostaddress2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ServerDeviceId",
                table: "LicenseKeys",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServerDeviceId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LicenseKeys_ServerDeviceId",
                table: "LicenseKeys",
                column: "ServerDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ServerDeviceId",
                table: "Applications",
                column: "ServerDeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_serverDevices_ServerDeviceId",
                table: "Applications",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LicenseKeys_serverDevices_ServerDeviceId",
                table: "LicenseKeys",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_serverDevices_ServerDeviceId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_LicenseKeys_serverDevices_ServerDeviceId",
                table: "LicenseKeys");

            migrationBuilder.DropIndex(
                name: "IX_LicenseKeys_ServerDeviceId",
                table: "LicenseKeys");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ServerDeviceId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ServerDeviceId",
                table: "LicenseKeys");

            migrationBuilder.DropColumn(
                name: "ServerDeviceId",
                table: "Applications");
        }
    }
}
