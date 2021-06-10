using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IServerRepository
    {
        Task<RepositoryResponse<List<ServerExport>>> ExportServerData();
        Task<RepositoryResponse<int>> CreateSerer(ServerDevice serverDevice);
        Task<RepositoryResponse<List<ServerDevice>>> DeleteServer(int id);
        Task<RepositoryResponse<List<ServerDeviceDTO>>> GetAllServers();
        Task UpdateServer(ServerDevice serverDevice);
        Task<RepositoryResponse<ServerDevice>> GetSingleServer(int id);

        Task<RepositoryResponse<ServerDevice>> AddMemory(Memory memory);
        Task<RepositoryResponse<ServerDevice>> UpdateMemory(Memory memory);
        Task DeleteMemory(int id);
        Task<RepositoryResponse<ServerDevice>> CreateCPU(Cpu cpu);
        Task<RepositoryResponse<ServerDevice>> UpdateCPU(Cpu cpu);
        Task DeleteCPU(int id);
        Task<RepositoryResponse<ServerDevice>> AddPowerConsumer(PowerConsumer powerConsumer);
        Task<RepositoryResponse<ServerDevice>> UpdatePowerConsumer(PowerConsumer powerConsumer);
        Task DeletePowerConsumer(int id);
    }
}
