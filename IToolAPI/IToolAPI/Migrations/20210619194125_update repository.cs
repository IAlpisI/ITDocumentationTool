using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updaterepository : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc");

            migrationBuilder.DropColumn(
                name: "ClinetPcId",
                table: "Generals");

            migrationBuilder.RenameColumn(
                name: "CreatioDate",
                table: "Generals",
                newName: "CreationDate");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc",
                column: "GeneralId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc");

            migrationBuilder.RenameColumn(
                name: "CreationDate",
                table: "Generals",
                newName: "CreatioDate");

            migrationBuilder.AddColumn<int>(
                name: "ClinetPcId",
                table: "Generals",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc",
                column: "GeneralId",
                unique: true,
                filter: "[GeneralId] IS NOT NULL");
        }
    }
}
