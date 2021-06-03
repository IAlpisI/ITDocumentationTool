using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class UpdateApplication : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LicenseKeys_Applications_ApplicationId",
                table: "LicenseKeys");

            migrationBuilder.AddForeignKey(
                name: "FK_LicenseKeys_Applications_ApplicationId",
                table: "LicenseKeys",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LicenseKeys_Applications_ApplicationId",
                table: "LicenseKeys");

            migrationBuilder.AddForeignKey(
                name: "FK_LicenseKeys_Applications_ApplicationId",
                table: "LicenseKeys",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
