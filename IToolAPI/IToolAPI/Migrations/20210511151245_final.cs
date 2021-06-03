using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class final : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Monitors");

            migrationBuilder.AddColumn<int>(
                name: "ClientPcId",
                table: "LicenseKeys",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RouterDeviceId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SwitchDeviceId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "RouterDeviceId",
                table: "DevicePorts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "SwitchDeviceId",
                table: "DevicePorts",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientPcId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LicenseKeys_ClientPcId",
                table: "LicenseKeys",
                column: "ClientPcId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses",
                column: "RouterDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_SwitchDeviceId",
                table: "HostAddresses",
                column: "SwitchDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_DevicePorts_RouterDeviceId",
                table: "DevicePorts",
                column: "RouterDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_DevicePorts_SwitchDeviceId",
                table: "DevicePorts",
                column: "SwitchDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ClientPcId",
                table: "Applications",
                column: "ClientPcId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_ClientPc_ClientPcId",
                table: "Applications",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DevicePorts_RouterDevices_RouterDeviceId",
                table: "DevicePorts",
                column: "RouterDeviceId",
                principalTable: "RouterDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DevicePorts_SwitchDevices_SwitchDeviceId",
                table: "DevicePorts",
                column: "SwitchDeviceId",
                principalTable: "SwitchDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_RouterDevices_RouterDeviceId",
                table: "HostAddresses",
                column: "RouterDeviceId",
                principalTable: "RouterDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_SwitchDevices_SwitchDeviceId",
                table: "HostAddresses",
                column: "SwitchDeviceId",
                principalTable: "SwitchDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LicenseKeys_ClientPc_ClientPcId",
                table: "LicenseKeys",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_ClientPc_ClientPcId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_DevicePorts_RouterDevices_RouterDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropForeignKey(
                name: "FK_DevicePorts_SwitchDevices_SwitchDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_RouterDevices_RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_SwitchDevices_SwitchDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_LicenseKeys_ClientPc_ClientPcId",
                table: "LicenseKeys");

            migrationBuilder.DropIndex(
                name: "IX_LicenseKeys_ClientPcId",
                table: "LicenseKeys");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_SwitchDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_DevicePorts_RouterDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropIndex(
                name: "IX_DevicePorts_SwitchDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ClientPcId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ClientPcId",
                table: "LicenseKeys");

            migrationBuilder.DropColumn(
                name: "RouterDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "SwitchDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "RouterDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropColumn(
                name: "SwitchDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropColumn(
                name: "ClientPcId",
                table: "Applications");

            migrationBuilder.CreateTable(
                name: "Monitors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Display = table.Column<double>(type: "float", nullable: false),
                    DisplayMeasure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FormFactorId = table.Column<int>(type: "int", nullable: true),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    Pivot = table.Column<bool>(type: "bit", nullable: false),
                    PowerConsumerId = table.Column<int>(type: "int", nullable: true),
                    Resolution = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Speaker = table.Column<bool>(type: "bit", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monitors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Monitors_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Monitors_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Monitors_PowerConsumers_PowerConsumerId",
                        column: x => x.PowerConsumerId,
                        principalTable: "PowerConsumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_FormFactorId",
                table: "Monitors",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_GeneralId",
                table: "Monitors",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_PowerConsumerId",
                table: "Monitors",
                column: "PowerConsumerId");
        }
    }
}
