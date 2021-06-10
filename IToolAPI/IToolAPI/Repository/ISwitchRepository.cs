using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface ISwitchRepository
    {
        Task<RepositoryResponse<List<SwitchExport>>> ExportSwitchData();
        Task<RepositoryResponse<int>> CreateSwitch(SwitchDevice switchDevice);
        Task<RepositoryResponse<List<SwitchDevice>>> DeleteSwitch(int id);
        Task<RepositoryResponse<List<SwitchDeviceDTO>>> GetAllSwitches();
        Task UpdateSwitch(SwitchDevice switchDevice);
        Task<RepositoryResponse<SwitchDevice>> GetSingleSwitch(int id);
    }
}
