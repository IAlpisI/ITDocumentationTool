// <auto-generated />
using System;
using IToolAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace IToolAPI.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210504162233_port2")]
    partial class port2
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("IToolAPI.Models.Application", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Specification")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GeneralId");

                    b.ToTable("Applications");
                });

            modelBuilder.Entity("IToolAPI.Models.Cable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CableLength")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CableLengthMeasure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CableType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Color")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("EndPortId")
                        .HasColumnType("int");

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<int?>("StartPortId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("EndPortId");

                    b.HasIndex("GeneralId");

                    b.HasIndex("StartPortId");

                    b.ToTable("Cables");
                });

            modelBuilder.Entity("IToolAPI.Models.ClientPc", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("ApplicationId")
                        .HasColumnType("int");

                    b.Property<int?>("CpuId")
                        .HasColumnType("int");

                    b.Property<string>("Display")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DisplayMeasure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<string>("KeyboardLayout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("LicenseKeyId")
                        .HasColumnType("int");

                    b.Property<int?>("MemoryId")
                        .HasColumnType("int");

                    b.Property<int?>("PowerConsumerId")
                        .HasColumnType("int");

                    b.Property<string>("Resolution")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("CpuId");

                    b.HasIndex("GeneralId")
                        .IsUnique()
                        .HasFilter("[GeneralId] IS NOT NULL");

                    b.HasIndex("LicenseKeyId");

                    b.HasIndex("MemoryId");

                    b.HasIndex("PowerConsumerId");

                    b.ToTable("ClientPc");
                });

            modelBuilder.Entity("IToolAPI.Models.LayerThreeNetwork", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<string>("NetIp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Prefix")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GeneralId");

                    b.ToTable("LayerThreeNetwoks");
                });

            modelBuilder.Entity("IToolAPI.Models.LicenseKey", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<int?>("ApplicationId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ExpireDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Key")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("PricePerUnit")
                        .HasColumnType("float");

                    b.Property<string>("Serial")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.ToTable("LicenseKeys");
                });

            modelBuilder.Entity("IToolAPI.Models.Monitor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Display")
                        .HasColumnType("float");

                    b.Property<string>("DisplayMeasure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("FormFactorId")
                        .HasColumnType("int");

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<bool>("Pivot")
                        .HasColumnType("bit");

                    b.Property<int?>("PowerConsumerId")
                        .HasColumnType("int");

                    b.Property<string>("Resolution")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("Speaker")
                        .HasColumnType("bit");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormFactorId");

                    b.HasIndex("GeneralId");

                    b.HasIndex("PowerConsumerId");

                    b.ToTable("Monitors");
                });

            modelBuilder.Entity("IToolAPI.Models.Person", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CompanyNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmailAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FullName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Function")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("GeneralId")
                        .HasColumnType("int");

                    b.Property<string>("PersonalNumber")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GeneralId");

                    b.ToTable("People");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            CompanyNumber = "213524",
                            Description = "asfasfas",
                            EmailAddress = "afassa",
                            FullName = "asfsaffa",
                            Function = "fasfasfsa",
                            GeneralId = 1,
                            PersonalNumber = "fsdfdsgdsg"
                        });
                });

            modelBuilder.Entity("IToolAPI.Models.Printer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Colored")
                        .HasColumnType("bit");

                    b.Property<bool>("Duplex")
                        .HasColumnType("bit");

                    b.Property<string>("Emulation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<int>("Generald")
                        .HasColumnType("int");

                    b.Property<string>("PaperFormat")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("GeneralId");

                    b.ToTable("Printers");
                });

            modelBuilder.Entity("IToolAPI.Models.RouterDevice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FormFactorId")
                        .HasColumnType("int");

                    b.Property<string>("GatewayAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<int?>("PowerConsumerId")
                        .HasColumnType("int");

                    b.Property<string>("RoutingProtocol")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormFactorId");

                    b.HasIndex("GeneralId");

                    b.HasIndex("PowerConsumerId");

                    b.ToTable("RouterDevices");
                });

            modelBuilder.Entity("IToolAPI.Models.ServerDevice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FormFactorId")
                        .HasColumnType("int");

                    b.Property<int>("GeneralId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("FormFactorId");

                    b.HasIndex("GeneralId");

                    b.ToTable("serverDevices");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.Cpu", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CpuCores")
                        .HasColumnType("int");

                    b.Property<double>("CpuFrequency")
                        .HasColumnType("float");

                    b.Property<string>("CpuFrequencyType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ServerDeviceId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ServerDeviceId");

                    b.ToTable("Cpus");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.Desktop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("KeyboardLayout")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("MouseModel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Desktops");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.DevicePort", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Model")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Plug")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Speed")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpeedMeassure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("DevicePorts");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.FormFactor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Depth")
                        .HasColumnType("float");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("DimesnsionUnit")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Height")
                        .HasColumnType("float");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RackUnit")
                        .HasColumnType("int");

                    b.Property<double>("Weight")
                        .HasColumnType("float");

                    b.Property<string>("WeightMeasure")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Width")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.ToTable("FormFactors");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.General", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ClinetPcId")
                        .HasColumnType("int");

                    b.Property<DateTime>("CreatioDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Creator")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("ModifiedDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Purpose")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Status")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Tag")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Generals");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ClinetPcId = 0,
                            CreatioDate = new DateTime(2021, 5, 4, 0, 0, 0, 0, DateTimeKind.Local),
                            Description = "fasfasfsa",
                            ModifiedDate = new DateTime(2021, 5, 4, 0, 0, 0, 0, DateTimeKind.Local),
                            Purpose = "fasfsafsa",
                            Status = "ffasfas",
                            Tag = "[\"test\",\"test\"]",
                            Title = "fafasfas"
                        });
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.HostAddress", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ClientPcId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("NetworkId")
                        .HasColumnType("int");

                    b.Property<int?>("PrinterId")
                        .HasColumnType("int");

                    b.Property<int?>("ServerDeviceId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ClientPcId")
                        .IsUnique()
                        .HasFilter("[ClientPcId] IS NOT NULL");

                    b.HasIndex("NetworkId");

                    b.HasIndex("PrinterId");

                    b.HasIndex("ServerDeviceId");

                    b.ToTable("HostAddresses");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.Memory", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Capacity")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CapacityType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ServerDeviceId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Type")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("ServerDeviceId");

                    b.ToTable("Memories");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.PowerConsumer", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<double>("Ampere")
                        .HasColumnType("float");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Manufacturer")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PowerModel")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ServerDeviceId")
                        .HasColumnType("int");

                    b.Property<string>("Title")
                        .HasColumnType("nvarchar(max)");

                    b.Property<double>("Volt")
                        .HasColumnType("float");

                    b.Property<double>("Watt")
                        .HasColumnType("float");

                    b.HasKey("Id");

                    b.HasIndex("ServerDeviceId");

                    b.ToTable("PowerConsumers");
                });

            modelBuilder.Entity("IToolAPI.Models.SwitchDevice", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int?>("FormFactorId")
                        .HasColumnType("int");

                    b.Property<int?>("GeneralId")
                        .HasColumnType("int");

                    b.Property<int?>("PowerConsumerId")
                        .HasColumnType("int");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SpanningTree")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Vlan")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("FormFactorId");

                    b.HasIndex("GeneralId");

                    b.HasIndex("PowerConsumerId");

                    b.ToTable("SwitchDevices");
                });

            modelBuilder.Entity("IToolAPI.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Role")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasFilter("[Email] IS NOT NULL");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("IToolAPI.Models.Application", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.Navigation("General");
                });

            modelBuilder.Entity("IToolAPI.Models.Cable", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.DevicePort", "EndPort")
                        .WithMany()
                        .HasForeignKey("EndPortId");

                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.HasOne("IToolAPI.Models.Shared.DevicePort", "StartPort")
                        .WithMany()
                        .HasForeignKey("StartPortId");

                    b.Navigation("EndPort");

                    b.Navigation("General");

                    b.Navigation("StartPort");
                });

            modelBuilder.Entity("IToolAPI.Models.ClientPc", b =>
                {
                    b.HasOne("IToolAPI.Models.Application", "Application")
                        .WithMany()
                        .HasForeignKey("ApplicationId");

                    b.HasOne("IToolAPI.Models.Shared.Cpu", "Cpu")
                        .WithMany()
                        .HasForeignKey("CpuId");

                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithOne("ClientPc")
                        .HasForeignKey("IToolAPI.Models.ClientPc", "GeneralId");

                    b.HasOne("IToolAPI.Models.LicenseKey", "LicenseKey")
                        .WithMany()
                        .HasForeignKey("LicenseKeyId");

                    b.HasOne("IToolAPI.Models.Shared.Memory", "Memory")
                        .WithMany()
                        .HasForeignKey("MemoryId");

                    b.HasOne("IToolAPI.Models.Shared.PowerConsumer", "PowerConsumer")
                        .WithMany()
                        .HasForeignKey("PowerConsumerId");

                    b.Navigation("Application");

                    b.Navigation("Cpu");

                    b.Navigation("General");

                    b.Navigation("LicenseKey");

                    b.Navigation("Memory");

                    b.Navigation("PowerConsumer");
                });

            modelBuilder.Entity("IToolAPI.Models.LayerThreeNetwork", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.Navigation("General");
                });

            modelBuilder.Entity("IToolAPI.Models.LicenseKey", b =>
                {
                    b.HasOne("IToolAPI.Models.Application", "Application")
                        .WithMany("LicenseKey")
                        .HasForeignKey("ApplicationId");

                    b.Navigation("Application");
                });

            modelBuilder.Entity("IToolAPI.Models.Monitor", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.FormFactor", "FormFactor")
                        .WithMany()
                        .HasForeignKey("FormFactorId");

                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.HasOne("IToolAPI.Models.Shared.PowerConsumer", "PowerConsumer")
                        .WithMany()
                        .HasForeignKey("PowerConsumerId");

                    b.Navigation("FormFactor");

                    b.Navigation("General");

                    b.Navigation("PowerConsumer");
                });

            modelBuilder.Entity("IToolAPI.Models.Person", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("General");
                });

            modelBuilder.Entity("IToolAPI.Models.Printer", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.Navigation("General");
                });

            modelBuilder.Entity("IToolAPI.Models.RouterDevice", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.FormFactor", "FormFactor")
                        .WithMany()
                        .HasForeignKey("FormFactorId");

                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.HasOne("IToolAPI.Models.Shared.PowerConsumer", "PowerConsumer")
                        .WithMany()
                        .HasForeignKey("PowerConsumerId");

                    b.Navigation("FormFactor");

                    b.Navigation("General");

                    b.Navigation("PowerConsumer");
                });

            modelBuilder.Entity("IToolAPI.Models.ServerDevice", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.FormFactor", "FormFactor")
                        .WithMany()
                        .HasForeignKey("FormFactorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("FormFactor");

                    b.Navigation("General");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.Cpu", b =>
                {
                    b.HasOne("IToolAPI.Models.ServerDevice", "ServerDevice")
                        .WithMany("Cpu")
                        .HasForeignKey("ServerDeviceId");

                    b.Navigation("ServerDevice");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.HostAddress", b =>
                {
                    b.HasOne("IToolAPI.Models.ClientPc", "ClientPc")
                        .WithOne("HostAddress")
                        .HasForeignKey("IToolAPI.Models.Shared.HostAddress", "ClientPcId");

                    b.HasOne("IToolAPI.Models.LayerThreeNetwork", "Network")
                        .WithMany()
                        .HasForeignKey("NetworkId");

                    b.HasOne("IToolAPI.Models.Printer", "Printer")
                        .WithMany()
                        .HasForeignKey("PrinterId");

                    b.HasOne("IToolAPI.Models.ServerDevice", "ServerDevice")
                        .WithMany()
                        .HasForeignKey("ServerDeviceId");

                    b.Navigation("ClientPc");

                    b.Navigation("Network");

                    b.Navigation("Printer");

                    b.Navigation("ServerDevice");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.Memory", b =>
                {
                    b.HasOne("IToolAPI.Models.ServerDevice", "ServerDevice")
                        .WithMany("Memory")
                        .HasForeignKey("ServerDeviceId");

                    b.Navigation("ServerDevice");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.PowerConsumer", b =>
                {
                    b.HasOne("IToolAPI.Models.ServerDevice", "ServerDevice")
                        .WithMany("PowerConsumer")
                        .HasForeignKey("ServerDeviceId");

                    b.Navigation("ServerDevice");
                });

            modelBuilder.Entity("IToolAPI.Models.SwitchDevice", b =>
                {
                    b.HasOne("IToolAPI.Models.Shared.FormFactor", "FormFactor")
                        .WithMany()
                        .HasForeignKey("FormFactorId");

                    b.HasOne("IToolAPI.Models.Shared.General", "General")
                        .WithMany()
                        .HasForeignKey("GeneralId");

                    b.HasOne("IToolAPI.Models.Shared.PowerConsumer", "PowerConsumer")
                        .WithMany()
                        .HasForeignKey("PowerConsumerId");

                    b.Navigation("FormFactor");

                    b.Navigation("General");

                    b.Navigation("PowerConsumer");
                });

            modelBuilder.Entity("IToolAPI.Models.Application", b =>
                {
                    b.Navigation("LicenseKey");
                });

            modelBuilder.Entity("IToolAPI.Models.ClientPc", b =>
                {
                    b.Navigation("HostAddress");
                });

            modelBuilder.Entity("IToolAPI.Models.ServerDevice", b =>
                {
                    b.Navigation("Cpu");

                    b.Navigation("Memory");

                    b.Navigation("PowerConsumer");
                });

            modelBuilder.Entity("IToolAPI.Models.Shared.General", b =>
                {
                    b.Navigation("ClientPc");
                });
#pragma warning restore 612, 618
        }
    }
}
