using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateGeneral : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientPc_Desktops_DesktopId",
                table: "ClientPc");

            migrationBuilder.DropForeignKey(
                name: "FK_Printers_Generals_Generald",
                table: "Printers");

            migrationBuilder.DropIndex(
                name: "IX_Printers_Generald",
                table: "Printers");

            migrationBuilder.DropIndex(
                name: "IX_ClientPc_DesktopId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "DesktopId",
                table: "ClientPc");

            migrationBuilder.RenameColumn(
                name: "DateOfChange",
                table: "Generals",
                newName: "ModifiedDate");

            migrationBuilder.AddColumn<int>(
                name: "GeneralId",
                table: "Printers",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Display",
                table: "ClientPc",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DisplayMeasure",
                table: "ClientPc",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "KeyboardLayout",
                table: "ClientPc",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Resolution",
                table: "ClientPc",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "LayerThreeNetwoks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    NetIp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Prefix = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LayerThreeNetwoks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LayerThreeNetwoks_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "ModifiedDate" },
                values: new object[] { new DateTime(2021, 4, 16, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 16, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.CreateIndex(
                name: "IX_Printers_GeneralId",
                table: "Printers",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_LayerThreeNetwoks_GeneralId",
                table: "LayerThreeNetwoks",
                column: "GeneralId");

            migrationBuilder.AddForeignKey(
                name: "FK_Printers_Generals_GeneralId",
                table: "Printers",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Printers_Generals_GeneralId",
                table: "Printers");

            migrationBuilder.DropTable(
                name: "LayerThreeNetwoks");

            migrationBuilder.DropIndex(
                name: "IX_Printers_GeneralId",
                table: "Printers");

            migrationBuilder.DropColumn(
                name: "GeneralId",
                table: "Printers");

            migrationBuilder.DropColumn(
                name: "Display",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "DisplayMeasure",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "KeyboardLayout",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "Resolution",
                table: "ClientPc");

            migrationBuilder.RenameColumn(
                name: "ModifiedDate",
                table: "Generals",
                newName: "DateOfChange");

            migrationBuilder.AddColumn<int>(
                name: "DesktopId",
                table: "ClientPc",
                type: "int",
                nullable: true);

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "DateOfChange" },
                values: new object[] { new DateTime(2021, 4, 13, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 13, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.CreateIndex(
                name: "IX_Printers_Generald",
                table: "Printers",
                column: "Generald",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_DesktopId",
                table: "ClientPc",
                column: "DesktopId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientPc_Desktops_DesktopId",
                table: "ClientPc",
                column: "DesktopId",
                principalTable: "Desktops",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Printers_Generals_Generald",
                table: "Printers",
                column: "Generald",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
