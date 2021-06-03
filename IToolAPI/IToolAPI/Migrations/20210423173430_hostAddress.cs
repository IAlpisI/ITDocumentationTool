using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class hostAddress : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_HostAddresses_HostAddressId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_HostAddressId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "HostAddressId",
                table: "ClientPc");

            migrationBuilder.AddColumn<int>(
                name: "ClientId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ClientPcId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PrinterId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ServerDeviceId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "ModifiedDate" },
                values: new object[] { new DateTime(2021, 4, 23, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 23, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ClientPcId",
                table: "HostAddresses",
                column: "ClientPcId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_PrinterId",
                table: "HostAddresses",
                column: "PrinterId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ServerDeviceId",
                table: "HostAddresses",
                column: "ServerDeviceId");

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientPcId",
                table: "HostAddresses",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_Printers_PrinterId",
                table: "HostAddresses",
                column: "PrinterId",
                principalTable: "Printers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_serverDevices_ServerDeviceId",
                table: "HostAddresses",
                column: "ServerDeviceId",
                principalTable: "serverDevices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientPcId",
                table: "HostAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_Printers_PrinterId",
                table: "HostAddresses");

            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_serverDevices_ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ClientPcId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_PrinterId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "ClientId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "ClientPcId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "PrinterId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "ServerDeviceId",
                table: "HostAddresses");

            migrationBuilder.AddColumn<int>(
                name: "HostAddressId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "ModifiedDate" },
                values: new object[] { new DateTime(2021, 4, 16, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 16, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_HostAddressId",
                table: "ClientPc",
                column: "HostAddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_HostAddresses_HostAddressId",
                table: "ClientPc",
                column: "HostAddressId",
                principalTable: "HostAddresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
