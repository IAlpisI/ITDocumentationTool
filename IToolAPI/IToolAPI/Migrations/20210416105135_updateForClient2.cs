using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateForClient2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc");

            migrationBuilder.AlterColumn<int>(
                name: "ServerDeviceId",
                table: "PowerConsumers",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ServerDeviceId",
                table: "Memories",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "ServerDeviceId",
                table: "Cpus",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc",
                column: "CpuId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc",
                column: "MemoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc",
                column: "PowerConsumerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Cpus_serverDevices_ServerDeviceId",
                table: "Cpus",
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

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc");

            migrationBuilder.AlterColumn<int>(
                name: "ServerDeviceId",
                table: "PowerConsumers",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ServerDeviceId",
                table: "Memories",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ServerDeviceId",
                table: "Cpus",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc",
                column: "CpuId",
                unique: true,
                filter: "[CpuId] IS NOT NULL");

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
        }
    }
}
