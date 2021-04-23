using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class test4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Printers_Generals_GeneralId",
                table: "Printers");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Printers_Generals_GeneralId",
                table: "Printers",
                column: "GeneralId",
                principalTable: "Generals",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
