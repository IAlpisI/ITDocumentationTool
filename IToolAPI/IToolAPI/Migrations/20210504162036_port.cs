using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class port : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DCandidates");

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "ModifiedDate" },
                values: new object[] { new DateTime(2021, 5, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 5, 4, 0, 0, 0, 0, DateTimeKind.Local) });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DCandidates",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    address = table.Column<string>(type: "varchar(100)", nullable: true),
                    age = table.Column<string>(type: "varchar(100)", nullable: false),
                    bloodGroup = table.Column<string>(type: "varchar(100)", nullable: true),
                    email = table.Column<string>(type: "varchar(100)", nullable: true),
                    fullName = table.Column<string>(type: "varchar(100)", nullable: true),
                    mobille = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DCandidates", x => x.id);
                });

            migrationBuilder.UpdateData(
                table: "Generals",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatioDate", "ModifiedDate" },
                values: new object[] { new DateTime(2021, 4, 23, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2021, 4, 23, 0, 0, 0, 0, DateTimeKind.Local) });
        }
    }
}
