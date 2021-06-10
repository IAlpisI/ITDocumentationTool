using IToolAPI.DTOs;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface ICableRepository
    {
        Task<RepositoryResponse<int>> CreateCable(Cable cable);
        Task<RepositoryResponse<List<Cable>>> DeleteCable(int id);
        Task<RepositoryResponse<List<CableDTO>>> GetAllCables();
        Task<RepositoryResponse<Cable>> GetCable(int id);
        Task<RepositoryResponse<List<Cable>>> GetCablesWithInformation();
        Task UpdateCable(Cable cable);
    }
}
