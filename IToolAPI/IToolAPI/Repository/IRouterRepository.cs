using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IRouterRepository
    {
        Task<RepositoryResponse<List<RouterExport>>> ExportRouterData();
        Task<RepositoryResponse<int>> CreateRouter(RouterDevice routerDevice);
        Task<RepositoryResponse<List<RouterDevice>>> DeleteRouter(int id);
        Task<RepositoryResponse<List<RouterDeviceDTO>>> GetAllRouters();
        Task UpdateRouter(RouterDevice routerDevice);
        Task<RepositoryResponse<RouterDevice>> GetSingleRouter(int id);
        Task<RepositoryResponse<RouterDevice>> PostNetwork(LayerThreeNetwork network);
        Task<RepositoryResponse<RouterDevice>> PutNetwork(LayerThreeNetwork network);
    }
}
