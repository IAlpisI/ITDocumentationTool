using IToolAPI.DTOs;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface INetworkRepository
    {
        Task<RepositoryResponse<int>> CreateNetwork(LayerThreeNetwork layerThreeNetwork);
        Task<RepositoryResponse<List<LayerThreeNetwork>>> DeleteNetwork(int id);
        Task<RepositoryResponse<List<LayerThreeNetworkDTO>>> GetAllNetworks();
        Task<RepositoryResponse<LayerThreeNetwork>> GetSingleNetwork(int id);
        Task UpdateNetwork(LayerThreeNetwork layerThreeNetwork);
    }
}
