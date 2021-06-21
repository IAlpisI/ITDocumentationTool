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
        Task<ServerDevice> GetSingleServer(int id);
        Task<ServerDevice> AddMemory(Memory memory);
        Task<ServerDevice> UpdateMemory(Memory memory);
        Task DeleteMemory(int id);
        Task<ServerDevice> CreateCPU(Cpu cpu);
        Task<ServerDevice> UpdateCPU(Cpu cpu);
        Task DeleteCPU(int id);
        Task<ServerDevice> AddPowerConsumer(PowerConsumer powerConsumer);
        Task<ServerDevice> UpdatePowerConsumer(PowerConsumer powerConsumer);
        Task DeletePowerConsumer(int id);
    }
}
