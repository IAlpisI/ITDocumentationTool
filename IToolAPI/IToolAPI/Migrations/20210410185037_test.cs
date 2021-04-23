using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace IToolAPI.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "DCandidates",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fullName = table.Column<string>(type: "varchar(100)", nullable: true),
                    mobille = table.Column<string>(type: "varchar(100)", nullable: true),
                    email = table.Column<string>(type: "varchar(100)", nullable: true),
                    age = table.Column<string>(type: "varchar(100)", nullable: false),
                    bloodGroup = table.Column<string>(type: "varchar(100)", nullable: true),
                    address = table.Column<string>(type: "varchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DCandidates", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Desktops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    KeyboardLayout = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MouseModel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Desktops", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FormFactors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RackUnit = table.Column<int>(type: "int", nullable: false),
                    DimesnsionUnit = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Width = table.Column<double>(type: "float", nullable: false),
                    Height = table.Column<double>(type: "float", nullable: false),
                    Depth = table.Column<double>(type: "float", nullable: false),
                    Weight = table.Column<double>(type: "float", nullable: false),
                    WeightMeasure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormFactors", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Generals",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Purpose = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatioDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateOfChange = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Tag = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Generals", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Applications",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    Specification = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applications_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "People",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Function = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CompanyNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GeneralId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_People", x => x.Id);
                    table.ForeignKey(
                        name: "FK_People_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Printers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Colored = table.Column<bool>(type: "bit", nullable: false),
                    Duplex = table.Column<bool>(type: "bit", nullable: false),
                    Emulation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaperFormat = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Printers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Printers_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ServerDevice",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: false),
                    FormFactorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerDevice", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServerDevice_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ServerDevice_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "LicenseKeys",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    Key = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Serial = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExpireDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PricePerUnit = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicationId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LicenseKeys", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LicenseKeys_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Cpus",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CpuCores = table.Column<int>(type: "int", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CpuFrequency = table.Column<double>(type: "float", nullable: false),
                    CpuFrequencyType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServerDeviceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cpus", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Cpus_ServerDevice_ServerDeviceId",
                        column: x => x.ServerDeviceId,
                        principalTable: "ServerDevice",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Memories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Manufacture = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Capacity = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CapacityType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServerDeviceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Memories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Memories_ServerDevice_ServerDeviceId",
                        column: x => x.ServerDeviceId,
                        principalTable: "ServerDevice",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PowerConsumers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Active = table.Column<bool>(type: "bit", nullable: false),
                    Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PowerModel = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Volt = table.Column<double>(type: "float", nullable: false),
                    Watt = table.Column<double>(type: "float", nullable: false),
                    Ampere = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ServerDeviceId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PowerConsumers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PowerConsumers_ServerDevice_ServerDeviceId",
                        column: x => x.ServerDeviceId,
                        principalTable: "ServerDevice",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ClientPc",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    MemoryId = table.Column<int>(type: "int", nullable: true),
                    CpuId = table.Column<int>(type: "int", nullable: true),
                    DesktopId = table.Column<int>(type: "int", nullable: true),
                    PowerConsumerId = table.Column<int>(type: "int", nullable: true),
                    ApplicationId = table.Column<int>(type: "int", nullable: true),
                    LicenseKeyId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientPc", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ClientPc_Applications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "Applications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientPc_Cpus_CpuId",
                        column: x => x.CpuId,
                        principalTable: "Cpus",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientPc_Desktops_DesktopId",
                        column: x => x.DesktopId,
                        principalTable: "Desktops",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientPc_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientPc_LicenseKeys_LicenseKeyId",
                        column: x => x.LicenseKeyId,
                        principalTable: "LicenseKeys",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientPc_Memories_MemoryId",
                        column: x => x.MemoryId,
                        principalTable: "Memories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ClientPc_PowerConsumers_PowerConsumerId",
                        column: x => x.PowerConsumerId,
                        principalTable: "PowerConsumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Monitors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    FormFactorId = table.Column<int>(type: "int", nullable: true),
                    Display = table.Column<double>(type: "float", nullable: false),
                    DisplayMeasure = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Resolution = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Pivot = table.Column<bool>(type: "bit", nullable: false),
                    Speaker = table.Column<bool>(type: "bit", nullable: false),
                    PowerConsumerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Monitors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Monitors_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Monitors_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Monitors_PowerConsumers_PowerConsumerId",
                        column: x => x.PowerConsumerId,
                        principalTable: "PowerConsumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "RouterDevices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    FormFactorId = table.Column<int>(type: "int", nullable: true),
                    PowerConsumerId = table.Column<int>(type: "int", nullable: true),
                    RoutingProtocol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GatewayAddress = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RouterDevices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RouterDevices_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RouterDevices_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RouterDevices_PowerConsumers_PowerConsumerId",
                        column: x => x.PowerConsumerId,
                        principalTable: "PowerConsumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SwitchDevices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GeneralId = table.Column<int>(type: "int", nullable: true),
                    FormFactorId = table.Column<int>(type: "int", nullable: true),
                    PowerConsumerId = table.Column<int>(type: "int", nullable: true),
                    Vlan = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Role = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SpanningTree = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SwitchDevices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SwitchDevices_FormFactors_FormFactorId",
                        column: x => x.FormFactorId,
                        principalTable: "FormFactors",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SwitchDevices_Generals_GeneralId",
                        column: x => x.GeneralId,
                        principalTable: "Generals",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SwitchDevices_PowerConsumers_PowerConsumerId",
                        column: x => x.PowerConsumerId,
                        principalTable: "PowerConsumers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Generals",
                columns: new[] { "Id", "CreatioDate", "Creator", "DateOfChange", "Description", "Purpose", "Status", "Tag", "Title" },
                values: new object[] { 1, new DateTime(2021, 4, 10, 0, 0, 0, 0, DateTimeKind.Local), null, new DateTime(2021, 4, 10, 0, 0, 0, 0, DateTimeKind.Local), "fasfasfsa", "fasfsafsa", "ffasfas", "[\"test\",\"test\"]", "fafasfas" });

            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "CompanyNumber", "Description", "EmailAddress", "FullName", "Function", "GeneralId", "PersonalNumber" },
                values: new object[] { 1, "213524", "asfasfas", "afassa", "asfsaffa", "fasfasfsa", 1, "fsdfdsgdsg" });

            migrationBuilder.CreateIndex(
                name: "IX_Applications_GeneralId",
                table: "Applications",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_ApplicationId",
                table: "ClientPc",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_CpuId",
                table: "ClientPc",
                column: "CpuId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_DesktopId",
                table: "ClientPc",
                column: "DesktopId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_GeneralId",
                table: "ClientPc",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_LicenseKeyId",
                table: "ClientPc",
                column: "LicenseKeyId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_MemoryId",
                table: "ClientPc",
                column: "MemoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ClientPc_PowerConsumerId",
                table: "ClientPc",
                column: "PowerConsumerId");

            migrationBuilder.CreateIndex(
                name: "IX_Cpus_ServerDeviceId",
                table: "Cpus",
                column: "ServerDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_LicenseKeys_ApplicationId",
                table: "LicenseKeys",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX_Memories_ServerDeviceId",
                table: "Memories",
                column: "ServerDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_FormFactorId",
                table: "Monitors",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_GeneralId",
                table: "Monitors",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_Monitors_PowerConsumerId",
                table: "Monitors",
                column: "PowerConsumerId");

            migrationBuilder.CreateIndex(
                name: "IX_People_GeneralId",
                table: "People",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_PowerConsumers_ServerDeviceId",
                table: "PowerConsumers",
                column: "ServerDeviceId");

            migrationBuilder.CreateIndex(
                name: "IX_Printers_GeneralId",
                table: "Printers",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_RouterDevices_FormFactorId",
                table: "RouterDevices",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_RouterDevices_GeneralId",
                table: "RouterDevices",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_RouterDevices_PowerConsumerId",
                table: "RouterDevices",
                column: "PowerConsumerId");

            migrationBuilder.CreateIndex(
                name: "IX_ServerDevice_FormFactorId",
                table: "ServerDevice",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_ServerDevice_GeneralId",
                table: "ServerDevice",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_SwitchDevices_FormFactorId",
                table: "SwitchDevices",
                column: "FormFactorId");

            migrationBuilder.CreateIndex(
                name: "IX_SwitchDevices_GeneralId",
                table: "SwitchDevices",
                column: "GeneralId");

            migrationBuilder.CreateIndex(
                name: "IX_SwitchDevices_PowerConsumerId",
                table: "SwitchDevices",
                column: "PowerConsumerId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "Users",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientPc");

            migrationBuilder.DropTable(
                name: "DCandidates");

            migrationBuilder.DropTable(
                name: "Monitors");

            migrationBuilder.DropTable(
                name: "People");

            migrationBuilder.DropTable(
                name: "Printers");

            migrationBuilder.DropTable(
                name: "RouterDevices");

            migrationBuilder.DropTable(
                name: "SwitchDevices");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Cpus");

            migrationBuilder.DropTable(
                name: "Desktops");

            migrationBuilder.DropTable(
                name: "LicenseKeys");

            migrationBuilder.DropTable(
                name: "Memories");

            migrationBuilder.DropTable(
                name: "PowerConsumers");

            migrationBuilder.DropTable(
                name: "Applications");

            migrationBuilder.DropTable(
                name: "ServerDevice");

            migrationBuilder.DropTable(
                name: "FormFactors");

            migrationBuilder.DropTable(
                name: "Generals");
        }
    }
}
