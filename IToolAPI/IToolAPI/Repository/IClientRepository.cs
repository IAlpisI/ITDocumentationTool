using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IClientRepository
    {
        Task<RepositoryResponse<List<ClientExport>>> ExportClientData();
        Task<RepositoryResponse<int>> CreateClient(ClientPc client);
        Task<RepositoryResponse<List<ClientPc>>> DeleteClient(int id);
        Task<RepositoryResponse<List<ClientPcDTO>>> GetAllClients();
        Task UpdateClient(ClientPc client);
        Task<RepositoryResponse<ClientPc>> GetSingleClient(int id);
    }
}
