using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace IToolAPI
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options
            /*,IOptions<OperationalStoreOptions> operationalStorage*/)
            : base(options/*, operationalStorage*/)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Seed();

            builder.Entity<General>().Property(p => p.Tag)
                .HasConversion(
                    v => JsonSerializer.Serialize(v, default),
                    v => JsonSerializer.Deserialize<List<string>>(v, default),
                    new ValueComparer<List<string>>(
                        (c1, c2) => c1.SequenceEqual(c2),
                        c => c.Aggregate(0, (a, v) => HashCode.Combine(a, v.GetHashCode())),
                        c => c.ToList()));

            builder.Entity<ServerDevice>()
                .HasMany(x => x.Cpu)
                .WithOne(s => s.ServerDevice)
                .HasForeignKey(s => s.ServerDeviceId);

            builder.Entity<ServerDevice>()
                .HasMany(x => x.PowerConsumer)
                .WithOne(s => s.ServerDevice)
                .HasForeignKey(s => s.ServerDeviceId);

            builder.Entity<ServerDevice>()
                .HasMany(x => x.Memory)
                .WithOne(s => s.ServerDevice)
                .HasForeignKey(s => s.ServerDeviceId);

            builder.Entity<Application>()
                .HasMany(x => x.LicenseKey)
                .WithOne(s => s.Application)
                .HasForeignKey(s => s.ApplicationId);

            //builder.Entity<ClientPc>()
            //    .HasOne(x => x.General)
            //    .WithMany()
            //    .OnDelete(DeleteBehavior.Restrict);

            //builder.Entity<General>()
            //    .HasOne(b => b.Printer)
            //    .WithOne(i => i.General)
            //    .HasForeignKey<Printer>(b => b.Generald)
            //    .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.Email).IsUnique();
            });

            base.OnModelCreating(builder);
        }

        public DbSet<DCandidate> DCandidates { get; set; }
        public DbSet<LayerThreeNetwork> LayerThreeNetwoks { get; set; }
        public DbSet<HostAddress> HostAddresses { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<Cpu> Cpus { get; set; }
        public DbSet<Desktop> Desktops { get; set; }
        public DbSet<FormFactor> FormFactors { get; set; }
        public DbSet<General> Generals { get; set; }
        public DbSet<Memory> Memories { get; set; }
        public DbSet<PowerConsumer> PowerConsumers { get; set; }
        public DbSet<Application> Applications { get; set; }
        public DbSet<ClientPc> ClientPc { get; set; }
        public DbSet<LicenseKey> LicenseKeys { get; set; }
        public DbSet<Monitor> Monitors { get; set; }
        public DbSet<Printer> Printers { get; set; }
        public DbSet<RouterDevice> RouterDevices { get; set; }
        public DbSet<SwitchDevice> SwitchDevices { get; set; }
        public DbSet<ServerDevice> serverDevices { get; set; }
    }
}
