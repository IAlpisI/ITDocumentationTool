using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IToolAPI.Repository
{
    public class NetworkRepository : INetworkRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;
        public NetworkRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<RepositoryResponse<int>> CreateNetwork(LayerThreeNetwork layerThreeNetwork)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(layerThreeNetwork);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = layerThreeNetwork.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<LayerThreeNetwork>>> DeleteNetwork(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<LayerThreeNetwork>>();

            try
            {
                var network = _context.LayerThreeNetwoks
                    .Include(x => x.General)
                    .FirstOrDefault(x => x.Id == id);

                if (network != null)
                {
                    if (network.General != null) { _context.Generals.Remove(network.General); }
                    _context.LayerThreeNetwoks.Remove(network);
                    await _context.SaveChangesAsync();
                    repositoryResponse.Data = _context.LayerThreeNetwoks.ToList();
                }
                else
                {
                    repositoryResponse.Message = "Cable not found";
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

        public async Task<RepositoryResponse<LayerThreeNetwork>> GetSingleNetwork(int id)
        {
            var repositoryResponse = new RepositoryResponse<LayerThreeNetwork>();

            var network = await _context.LayerThreeNetwoks.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();
            repositoryResponse.Data = network;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<LayerThreeNetworkDTO>>> GetAllNetworks()
        {
            var repositoryResponse = new RepositoryResponse<List<LayerThreeNetworkDTO>>();

            var networks = await _context.LayerThreeNetwoks
                .Select(x => _mapper.Map<LayerThreeNetworkDTO>(x))
                .ToListAsync();
            repositoryResponse.Data = networks;


            return repositoryResponse;
        }

        public async Task UpdateNetwork(LayerThreeNetwork layerThreeNetwork)
        {
            _context.Update(layerThreeNetwork);
            await _context.SaveChangesAsync();
        }
    }
}
