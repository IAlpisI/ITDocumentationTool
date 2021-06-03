using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class updateUsers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "Users");

            migrationBuilder.DeleteData(
                table: "People",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Users",
                newName: "Username");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "Users",
                column: "Username",
                unique: true,
                filter: "[Username] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "Users");

            migrationBuilder.RenameColumn(
                name: "Username",
                table: "Users",
                newName: "Email");

            migrationBuilder.InsertData(
                table: "Generals",
                columns: new[] { "Id", "ClinetPcId", "CreatioDate", "Creator", "Description", "ModifiedDate", "Purpose", "Status", "Tag", "Title" },
                values: new object[] { 1, 0, new DateTime(2021, 5, 4, 0, 0, 0, 0, DateTimeKind.Local), null, "fasfasfsa", new DateTime(2021, 5, 4, 0, 0, 0, 0, DateTimeKind.Local), "fasfsafsa", "ffasfas", "[\"test\",\"test\"]", "fafasfas" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "CompanyNumber", "Description", "EmailAddress", "FullName", "Function", "GeneralId", "PersonalNumber" },
                values: new object[] { 1, "213524", "asfasfas", "afassa", "asfsaffa", "fasfasfsa", 1, "fsdfdsgdsg" });

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }
    }
}
