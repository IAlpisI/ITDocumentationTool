using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class hostAddress4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ClientId",
                table: "HostAddresses");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "HostAddresses",
                newName: "ClientPcId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ClientPcId",
                table: "HostAddresses",
                column: "ClientPcId",
                unique: true,
                filter: "[ClientPcId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientPcId",
                table: "HostAddresses",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientPcId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ClientPcId",
                table: "HostAddresses");

            migrationBuilder.RenameColumn(
                name: "ClientPcId",
                table: "HostAddresses",
                newName: "ClientId");

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ClientId",
                table: "HostAddresses",
                column: "ClientId",
                unique: true,
                filter: "[ClientId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientId",
                table: "HostAddresses",
                column: "ClientId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
