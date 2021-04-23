using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class removeapplication : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_Applications_ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_LicenseKeys_LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_Cpus_ServerDevice_ServerDeviceId",
                table: "Cpus");

            migrationBuilder.DropForeignKey(
                name: "FK_Memories_ServerDevice_ServerDeviceId",
                table: "Memories");

            migrationBuilder.DropForeignKey(
                name: "FK_PowerConsumers_ServerDevice_ServerDeviceId",
                table: "PowerConsumers");

            migrationBuilder.DropForeignKey(
                name: "FK_ServerDevice_FormFactors_FormFactorId",
                table: "ServerDevice");

            migrationBuilder.DropForeignKey(
                name: "FK_ServerDevice_Generals_GeneralId",
                table: "ServerDevice");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ServerDevice",
                table: "ServerDevice");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "PowerConsumers");

            migrationBuilder.DropColumn(
                name: "ApplicationId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "LicenseKeyId",
                table: "ClientPc");

            migrationBuilder.RenameTable(
                name: "ServerDevice",
                newName: "serverDevices");

            migrationBuilder.RenameIndex(
                name: "IX_ServerDevice_GeneralId",
                table: "serverDevices",
                newName: "IX_serverDevices_GeneralId");

            migrationBuilder.RenameIndex(
                name: "IX_ServerDevice_FormFactorId",
                table: "serverDevices",
                newName: "IX_serverDevices_FormFactorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_serverDevices",
                table: "serverDevices",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "DateOfChange" },
                values: new object[] { new DateTime(2021, 4, 13, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 13, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.AddForeignKey(
                name: "FK_Cpus_serverDevices_ServerDeviceId",
                table: "Cpus",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Memories_serverDevices_ServerDeviceId",
                table: "Memories",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PowerConsumers_serverDevices_ServerDeviceId",
                table: "PowerConsumers",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Cpus_serverDevices_ServerDeviceId",
                table: "Cpus");

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

            migrationBuilder.RenameTable(
                name: "serverDevices",
                newName: "ServerDevice");

            migrationBuilder.RenameIndex(
                name: "IX_serverDevices_GeneralId",
                table: "ServerDevice",
                newName: "IX_ServerDevice_GeneralId");

            migrationBuilder.RenameIndex(
                name: "IX_serverDevices_FormFactorId",
                table: "ServerDevice",
                newName: "IX_ServerDevice_FormFactorId");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "PowerConsumers",
                type: "bit",
                nullable: false,
                defaultValue: false);

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

            migrationBuilder.AddPrimaryKey(
                name: "PK_ServerDevice",
                table: "ServerDevice",
                column: "Id");

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "DateOfChange" },
                values: new object[] { new DateTime(2021, 4, 10, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 10, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc",
                column: "LicenseKeyId");

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
                name: "FK_Cpus_ServerDevice_ServerDeviceId",
                table: "Cpus",
                column: "ServerDeviceId",
                principalTable: "ServerDevice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Memories_ServerDevice_ServerDeviceId",
                table: "Memories",
                column: "ServerDeviceId",
                principalTable: "ServerDevice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PowerConsumers_ServerDevice_ServerDeviceId",
                table: "PowerConsumers",
                column: "ServerDeviceId",
                principalTable: "ServerDevice",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServerDevice_FormFactors_FormFactorId",
                table: "ServerDevice",
                column: "FormFactorId",
                principalTable: "FormFactors",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ServerDevice_Generals_GeneralId",
                table: "ServerDevice",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
