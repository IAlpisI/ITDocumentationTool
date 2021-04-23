using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class test5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Printers_Generals_GeneralId",
                table: "Printers");

            migrationBuilder.DropIndex(
                name: "IX_Printers_GeneralId",
                table: "Printers");

            migrationBuilder.DropColumn(
                name: "GeneralId",
                table: "Printers");

            migrationBuilder.CreateIndex(
                name: "IX_Printers_Generald",
                table: "Printers",
                column: "Generald",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Printers_Generals_Generald",
                table: "Printers",
                column: "Generald",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Printers_Generals_Generald",
                table: "Printers");

            migrationBuilder.DropIndex(
                name: "IX_Printers_Generald",
                table: "Printers");

            migrationBuilder.AddColumn<int>(
                name: "GeneralId",
                table: "Printers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Printers_GeneralId",
                table: "Printers",
                column: "GeneralId");

            migrationBuilder.AddForeignKey(
                name: "FK_Printers_Generals_GeneralId",
                table: "Printers",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
