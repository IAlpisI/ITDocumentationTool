using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public class ServerRepository : IServerRepository
    {
        private readonly ApplicationDbContext context;
        public ServerRepository(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
        }

        public async Task<ServerDevice> GetServerDeviceById(int id)
        {
            return await context.ServerDevices
                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<ServerDevice> AddMemory(Memory memory)
        {
            context.Add(memory);
            await context.SaveChangesAsync();
            var server = await GetServerDeviceById(memory.Id);

            return server;
        }

        public async Task<ServerDevice> AddPowerConsumer(PowerConsumer powerConsumer)
        {
            context.Add(powerConsumer);
            await context.SaveChangesAsync();
            var server = await GetServerDeviceById(powerConsumer.Id);

            return server;
        }

        public async Task<ServerDevice> CreateCPU(Cpu cpu)
        {
            context.Add(cpu);
            await context.SaveChangesAsync();
            var server = await GetServerDeviceById(cpu.Id);

            return server;
        }
        public async Task DeleteCPU(int id)
        {
            var cpu = await context.Cpus.FirstOrDefaultAsync(x => x.Id == id);
            context.Remove(cpu);
            await context.SaveChangesAsync();
        }

        public async Task DeleteMemory(int id)
        {
            var memory = await context.Memories.FirstOrDefaultAsync(x => x.Id == id);
            context.Remove(memory);
            await context.SaveChangesAsync();
        }

        public async Task DeletePowerConsumer(int id)
        {
            var powerConsumer = await context.PowerConsumers.FirstOrDefaultAsync(x => x.Id == id);
            context.Remove(powerConsumer);
            await context.SaveChangesAsync();
        }

        public async Task<ServerDevice> GetSingleServer(int id)
        {
            var server = await context.ServerDevices
                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .Include(x => x.Cpu)
                .Include(x => x.Memory)
                .Include(x => x.PowerConsumer)
                .Include(x => x.DevicePorts)
                .Include(x => x.ServerDeviceApplications)
                .Include(x => x.ServerDeviceLicenseKeys)
                .Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync(x => x.Id == id);

            return server;
        }

        public async Task<ServerDevice> UpdateCPU(Cpu cpu)
        {
            context.Update(cpu);
            await context.SaveChangesAsync();
            var server = await GetServerDeviceById(cpu.Id);

            return server;
        }

        public async Task<ServerDevice> UpdateMemory(Memory memory)
        {
            context.Update(memory);
            await context.SaveChangesAsync();
            var server = await GetServerDeviceById(memory.Id);

            return server;
        }

        public async Task<ServerDevice> UpdatePowerConsumer(PowerConsumer powerConsumer)
        {
            context.Update(powerConsumer);
            await context.SaveChangesAsync();
            var server = await GetServerDeviceById(powerConsumer.Id);

            return server;
        }
    }
}
