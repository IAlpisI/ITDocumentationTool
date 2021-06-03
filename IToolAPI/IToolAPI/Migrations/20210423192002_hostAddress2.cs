using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class hostAddress2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientPcId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ClientPcId",
                table: "HostAddresses");

            migrationBuilder.DropColumn(
                name: "ClientPcId",
                table: "HostAddresses");

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientId",
                table: "HostAddresses");

            migrationBuilder.DropIndex(
                name: "IX_HostAddresses_ClientId",
                table: "HostAddresses");

            migrationBuilder.AddColumn<int>(
                name: "ClientPcId",
                table: "HostAddresses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HostAddresses_ClientPcId",
                table: "HostAddresses",
                column: "ClientPcId");

            migrationBuilder.AddForeignKey(
                name: "FK_HostAddresses_ClientPc_ClientPcId",
                table: "HostAddresses",
                column: "ClientPcId",
                principalTable: "ClientPc",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
