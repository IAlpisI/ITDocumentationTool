using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateForClient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc");

            migrationBuilder.AddColumn<int>(
                name: "ClinetPcId",
                table: "Generals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc",
                column: "CpuId",
                unique: true,
                filter: "[CpuId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc",
                column: "GeneralId",
                unique: true,
                filter: "[GeneralId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc",
                column: "MemoryId",
                unique: true,
                filter: "[MemoryId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc",
                column: "PowerConsumerId",
                unique: true,
                filter: "[PowerConsumerId] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "ClinetPcId",
                table: "Generals");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc",
                column: "CpuId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc",
                column: "MemoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc",
                column: "PowerConsumerId");
        }
    }
}
