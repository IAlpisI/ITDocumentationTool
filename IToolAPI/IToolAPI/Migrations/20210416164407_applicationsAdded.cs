using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class applicationsAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ApplicationId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HostAddressId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LicenseKeyId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "HostAddresses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NetworkId = table.Column<int>(type: "int", nullable: true),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HostAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HostAddresses_LayerThreeNetwoks_NetworkId",
                        column: x => x.NetworkId,
                        principalTable: "LayerThreeNetwoks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_HostAddressId",
                table: "ClientPc",
                column: "HostAddressId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc",
                column: "LicenseKeyId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_NetworkId",
                table: "HostAddresses",
                column: "NetworkId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_Applications_ApplicationId",
                table: "ClientPc",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_HostAddresses_HostAddressId",
                table: "ClientPc",
                column: "HostAddressId",
                principalTable: "HostAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_LicenseKeys_LicenseKeyId",
                table: "ClientPc",
                column: "LicenseKeyId",
                principalTable: "LicenseKeys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_Applications_ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_HostAddresses_HostAddressId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_LicenseKeys_LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropTable(
                name: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_HostAddressId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "HostAddressId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "LicenseKeyId",
                table: "ClientPc");
        }
    }
}
