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
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public ServerRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServerDevice> GetServerDeviceById(int id)
        {
            return await _context.ServerDevices
                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<RepositoryResponse<ServerDevice>> AddMemory(Memory memory)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();

            _context.Add(memory);
            await _context.SaveChangesAsync();
            var server = await GetServerDeviceById(memory.Id);
            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ServerDevice>> AddPowerConsumer(PowerConsumer powerConsumer)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();

            _context.Add(powerConsumer);
            await _context.SaveChangesAsync();
            var server = await GetServerDeviceById(powerConsumer.Id);
            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ServerDevice>> CreateCPU(Cpu cpu)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();

            _context.Add(cpu);
            await _context.SaveChangesAsync();
            var server = await GetServerDeviceById(cpu.Id);
            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<int>> CreateSerer(ServerDevice serverDevice)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(serverDevice);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = serverDevice.Id;

            return repositoryResponse;
        }

        public async Task DeleteCPU(int id)
        {
            var cpu = await _context.Cpus.FirstOrDefaultAsync(x => x.Id == id);
            _context.Remove(cpu);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteMemory(int id)
        {
            var memory = await _context.Memories.FirstOrDefaultAsync(x => x.Id == id);
            _context.Remove(memory);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePowerConsumer(int id)
        {
            var powerConsumer = await _context.PowerConsumers.FirstOrDefaultAsync(x => x.Id == id);
            _context.Remove(powerConsumer);
            await _context.SaveChangesAsync();
        }

        public async Task<RepositoryResponse<List<ServerDevice>>> DeleteServer(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<ServerDevice>>();
            try
            {
                var server = _context.ServerDevices
                    .Include(x => x.General)
                    .Include(x => x.Cpu)
                    .Include(x => x.Memory)
                    .Include(x => x.PowerConsumer)
                    .Include(x => x.FormFactor)
                    .Include(x => x.HostAddress)
                    .FirstOrDefault(x => x.Id == id);

                if (server != null)
                {
                    if (server.General != null) { _context.Generals.Remove(server.General); }
                    if (server.Cpu != null) { _context.Cpus.RemoveRange(server.Cpu); }
                    if (server.Memory != null) { _context.Memories.RemoveRange(server.Memory); }
                    if (server.PowerConsumer != null) { _context.PowerConsumers.RemoveRange(server.PowerConsumer); }
                    if (server.HostAddress != null) { _context.HostAddresses.Remove(server.HostAddress); }
                    _context.ServerDevices.Remove(server);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    repositoryResponse.Message = "Server not found";
                    repositoryResponse.Success = false;
                }
            }
            catch (Exception ex)
            {
                repositoryResponse.Message = ex.Message;
                repositoryResponse.Success = false;
            }

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<ServerExport>>> ExportServerData()
        {
            var repositoryResponse = new RepositoryResponse<List<ServerExport>>();

            var servers = await _context.ServerDevices
                .Select(p => _mapper.Map<ServerExport>(p))
                .ToListAsync();
            repositoryResponse.Data = servers;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<ServerDeviceDTO>>> GetAllServers()
        {
            var repositoryResponse = new RepositoryResponse<List<ServerDeviceDTO>>();

            var servers = await _context.ServerDevices
                .Include(s => s.General)
                .Select(p => _mapper.Map<ServerDeviceDTO>(p))
                .ToListAsync();
            repositoryResponse.Data = servers;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ServerDevice>> GetSingleServer(int id)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();
            var server = await _context.ServerDevices
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

            if (server == null)
            {
                repositoryResponse.Message = "Server not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }

            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ServerDevice>> UpdateCPU(Cpu cpu)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();

            _context.Update(cpu);
            await _context.SaveChangesAsync();
            var server = await GetServerDeviceById(cpu.Id);
            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ServerDevice>> UpdateMemory(Memory memory)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();

            _context.Update(memory);
            await _context.SaveChangesAsync();
            var server = await GetServerDeviceById(memory.Id);
            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ServerDevice>> UpdatePowerConsumer(PowerConsumer powerConsumer)
        {
            var repositoryResponse = new RepositoryResponse<ServerDevice>();

            _context.Update(powerConsumer);
            await _context.SaveChangesAsync();
            var server = await GetServerDeviceById(powerConsumer.Id);
            repositoryResponse.Data = server;

            return repositoryResponse;
        }

        public async Task UpdateServer(ServerDevice serverDevice)
        {
            _context.Update(serverDevice);
            await _context.SaveChangesAsync();
        }
    }
}
