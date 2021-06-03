using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class fixedapp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_ClientPc_ClientPcId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_Applications_serverDevices_ServerDeviceId",
                table: "Applications");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_Applications_ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_LicenseKeys_LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_Cpus_serverDevices_ServerDeviceId",
                table: "Cpus");

            migrationBuilder.DropForeignKey(
                name: "FK_DevicePorts_serverDevices_ServerDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_serverDevices_ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_LicenseKeys_ClientPc_ClientPcId",
                table: "LicenseKeys");

            migrationBuilder.DropForeignKey(
                name: "FK_LicenseKeys_serverDevices_ServerDeviceId",
                table: "LicenseKeys");

            migrationBuilder.DropForeignKey(
                name: "FK_Memories_serverDevices_ServerDeviceId",
                table: "Memories");

            migrationBuilder.DropForeignKey(
                name: "FK_PowerConsumers_serverDevices_ServerDeviceId",
                table: "PowerConsumers");

            migrationBuilder.DropForeignKey(
                name: "FK_serverDevices_FormFactors_FormFactorId",
                table: "serverDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_serverDevices_Generals_GeneralId",
                table: "serverDevices");

            migrationBuilder.DropPrimaryKey(
                name: "PK_serverDevices",
                table: "serverDevices");

            migrationBuilder.DropIndex(
                name: "IX_LicenseKeys_ClientPcId",
                table: "LicenseKeys");

            migrationBuilder.DropIndex(
                name: "IX_LicenseKeys_ServerDeviceId",
                table: "LicenseKeys");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ClientPcId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_ServerDeviceId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ClientPcId",
                table: "LicenseKeys");

            migrationBuilder.DropColumn(
                name: "ServerDeviceId",
                table: "LicenseKeys");

            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "ClientPcId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "ServerDeviceId",
                table: "Applications");

            migrationBuilder.RenameTable(
                name: "serverDevices",
                newName: "ServerDevices");

            migrationBuilder.RenameIndex(
                name: "IX_serverDevices_GeneralId",
                table: "ServerDevices",
                newName: "IX_ServerDevices_GeneralId");

            migrationBuilder.RenameIndex(
                name: "IX_serverDevices_FormFactorId",
                table: "ServerDevices",
                newName: "IX_ServerDevices_FormFactorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServerDevices",
                table: "ServerDevices",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ClienPcLicenseKeys",
                columns: table => new
                {
                    ClientPcId = table.Column<int>(type: "int", nullable: false),
                    LicenseKeyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClienPcLicenseKeys", x => new { x.ClientPcId, x.LicenseKeyId });
                    table.ForeignKey(
                        name: "FK_ClienPcLicenseKeys_ClientPc_ClientPcId",
                        column: x => x.ClientPcId,
                        principalTable: "ClientPc",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClienPcLicenseKeys_LicenseKeys_LicenseKeyId",
                        column: x => x.LicenseKeyId,
                        principalTable: "LicenseKeys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientPcApplications",
                columns: table => new
                {
                    ClientPcId = table.Column<int>(type: "int", nullable: false),
                    ApplicationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientPcApplications", x => new { x.ClientPcId, x.ApplicationId });
                    table.ForeignKey(
                        name: "FK_ClientPcApplications_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientPcApplications_ClientPc_ClientPcId",
                        column: x => x.ClientPcId,
                        principalTable: "ClientPc",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServerDeviceApplications",
                columns: table => new
                {
                    ServerDeviceId = table.Column<int>(type: "int", nullable: false),
                    ApplicationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerDeviceApplications", x => new { x.ServerDeviceId, x.ApplicationId });
                    table.ForeignKey(
                        name: "FK_ServerDeviceApplications_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServerDeviceApplications_ServerDevices_ServerDeviceId",
                        column: x => x.ServerDeviceId,
                        principalTable: "ServerDevices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServerDeviceLicenseKeys",
                columns: table => new
                {
                    ServerDeviceId = table.Column<int>(type: "int", nullable: false),
                    LicenseKeyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerDeviceLicenseKeys", x => new { x.ServerDeviceId, x.LicenseKeyId });
                    table.ForeignKey(
                        name: "FK_ServerDeviceLicenseKeys_LicenseKeys_LicenseKeyId",
                        column: x => x.LicenseKeyId,
                        principalTable: "LicenseKeys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServerDeviceLicenseKeys_ServerDevices_ServerDeviceId",
                        column: x => x.ServerDeviceId,
                        principalTable: "ServerDevices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClienPcLicenseKeys_LicenseKeyId",
                table: "ClienPcLicenseKeys",
                column: "LicenseKeyId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPcApplications_ApplicationId",
                table: "ClientPcApplications",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ServerDeviceApplications_ApplicationId",
                table: "ServerDeviceApplications",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ServerDeviceLicenseKeys_LicenseKeyId",
                table: "ServerDeviceLicenseKeys",
                column: "LicenseKeyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cpus_ServerDevices_ServerDeviceId",
                table: "Cpus",
                column: "ServerDeviceId",
                principalTable: "ServerDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DevicePorts_ServerDevices_ServerDeviceId",
                table: "DevicePorts",
                column: "ServerDeviceId",
                principalTable: "ServerDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_ServerDevices_ServerDeviceId",
                table: "HostAddresses",
                column: "ServerDeviceId",
                principalTable: "ServerDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Memories_ServerDevices_ServerDeviceId",
                table: "Memories",
                column: "ServerDeviceId",
                principalTable: "ServerDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PowerConsumers_ServerDevices_ServerDeviceId",
                table: "PowerConsumers",
                column: "ServerDeviceId",
                principalTable: "ServerDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ServerDevices_FormFactors_FormFactorId",
                table: "ServerDevices",
                column: "FormFactorId",
                principalTable: "FormFactors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServerDevices_Generals_GeneralId",
                table: "ServerDevices",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cpus_ServerDevices_ServerDeviceId",
                table: "Cpus");

            migrationBuilder.DropForeignKey(
                name: "FK_DevicePorts_ServerDevices_ServerDeviceId",
                table: "DevicePorts");

            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_ServerDevices_ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_Memories_ServerDevices_ServerDeviceId",
                table: "Memories");

            migrationBuilder.DropForeignKey(
                name: "FK_PowerConsumers_ServerDevices_ServerDeviceId",
                table: "PowerConsumers");

            migrationBuilder.DropForeignKey(
                name: "FK_ServerDevices_FormFactors_FormFactorId",
                table: "ServerDevices");

            migrationBuilder.DropForeignKey(
                name: "FK_ServerDevices_Generals_GeneralId",
                table: "ServerDevices");

            migrationBuilder.DropTable(
                name: "ClienPcLicenseKeys");

            migrationBuilder.DropTable(
                name: "ClientPcApplications");

            migrationBuilder.DropTable(
                name: "ServerDeviceApplications");

            migrationBuilder.DropTable(
                name: "ServerDeviceLicenseKeys");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServerDevices",
                table: "ServerDevices");

            migrationBuilder.RenameTable(
                name: "ServerDevices",
                newName: "serverDevices");

            migrationBuilder.RenameIndex(
                name: "IX_ServerDevices_GeneralId",
                table: "serverDevices",
                newName: "IX_serverDevices_GeneralId");

            migrationBuilder.RenameIndex(
                name: "IX_ServerDevices_FormFactorId",
                table: "serverDevices",
                newName: "IX_serverDevices_FormFactorId");

            migrationBuilder.AddColumn<int>(
                name: "ClientPcId",
                table: "LicenseKeys",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServerDeviceId",
                table: "LicenseKeys",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ApplicationId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "LicenseKeyId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientPcId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServerDeviceId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_serverDevices",
                table: "serverDevices",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_LicenseKeys_ClientPcId",
                table: "LicenseKeys",
                column: "ClientPcId");

            migrationBuilder.CreateIndex(
                name: "IX_LicenseKeys_ServerDeviceId",
                table: "LicenseKeys",
                column: "ServerDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc",
                column: "LicenseKeyId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ClientPcId",
                table: "Applications",
                column: "ClientPcId");

            migrationBuilder.CreateIndex(
                name: "IX_Applications_ServerDeviceId",
                table: "Applications",
                column: "ServerDeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_ClientPc_ClientPcId",
                table: "Applications",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_serverDevices_ServerDeviceId",
                table: "Applications",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_Applications_ApplicationId",
                table: "ClientPc",
                column: "ApplicationId",
                principalTable: "Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_LicenseKeys_LicenseKeyId",
                table: "ClientPc",
                column: "LicenseKeyId",
                principalTable: "LicenseKeys",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Cpus_serverDevices_ServerDeviceId",
                table: "Cpus",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_DevicePorts_serverDevices_ServerDeviceId",
                table: "DevicePorts",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_serverDevices_ServerDeviceId",
                table: "HostAddresses",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LicenseKeys_ClientPc_ClientPcId",
                table: "LicenseKeys",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_LicenseKeys_serverDevices_ServerDeviceId",
                table: "LicenseKeys",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Memories_serverDevices_ServerDeviceId",
                table: "Memories",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PowerConsumers_serverDevices_ServerDeviceId",
                table: "PowerConsumers",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_serverDevices_FormFactors_FormFactorId",
                table: "serverDevices",
                column: "FormFactorId",
                principalTable: "FormFactors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_serverDevices_Generals_GeneralId",
                table: "serverDevices",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
