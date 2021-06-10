using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public class RouterRepository : IRouterRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public RouterRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<RepositoryResponse<int>> CreateRouter(RouterDevice routerDevice)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(routerDevice);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = routerDevice.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<RouterDevice>>> DeleteRouter(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<RouterDevice>>();
            try
            {
                var routerDevices = _context.RouterDevices
                    .Include(x => x.General)
                    .Include(x => x.PowerConsumer)
                    .Include(x => x.FormFactor)
                    .FirstOrDefault(x => x.Id == id);

                if (routerDevices != null)
                {
                    if (routerDevices.General != null) { _context.Generals.Remove(routerDevices.General); }
                    if (routerDevices.PowerConsumer != null) { _context.PowerConsumers.Remove(routerDevices.PowerConsumer); }
                    if (routerDevices.FormFactor != null) { _context.FormFactors.Remove(routerDevices.FormFactor); }
                    _context.RouterDevices.Remove(routerDevices);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    repositoryResponse.Message = "Router not found";
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

        public async Task<RepositoryResponse<List<RouterExport>>> ExportRouterData()
        {
            var repositoryResponse = new RepositoryResponse<List<RouterExport>>();

            var routerDevices = await _context.RouterDevices
                .Select(p => _mapper.Map<RouterExport>(p))
                .ToListAsync();
            repositoryResponse.Data = routerDevices;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<RouterDeviceDTO>>> GetAllRouters()
        {
            var repositoryResponse = new RepositoryResponse<List<RouterDeviceDTO>>();

            var routerDevices = await _context.RouterDevices
                .Include(x => x.General)
                .Select(p => _mapper.Map<RouterDeviceDTO>(p))
                .ToListAsync();
            repositoryResponse.Data = routerDevices;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<RouterDevice>> GetSingleRouter(int id)
        {
            var repositoryResponse = new RepositoryResponse<RouterDevice>();
            var routerDevice = await _context.RouterDevices
                .Include(x => x.General)
                .Include(x => x.LayerThreeNetworks)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (routerDevice == null)
            {
                repositoryResponse.Message = "Router not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }

            repositoryResponse.Data = routerDevice;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<RouterDevice>> PostNetwork(LayerThreeNetwork network)
        {
            var repositoryResponse = new RepositoryResponse<RouterDevice>();
            _context.Add(network);
            await _context.SaveChangesAsync();

            var routerDevice = await _context.RouterDevices
                    .Include(x => x.LayerThreeNetworks)
                    .FirstOrDefaultAsync(x => x.Id == network.RouterDeviceId);

            repositoryResponse.Data = routerDevice;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<RouterDevice>> PutNetwork(LayerThreeNetwork network)
        {
            var repositoryResponse = new RepositoryResponse<RouterDevice>();
            _context.Update(network);
            await _context.SaveChangesAsync();
            var routerDevice = await _context.RouterDevices.Where(x => x.Id == network.RouterDeviceId)
                .Include(x => x.LayerThreeNetworks)
                .FirstOrDefaultAsync();

            repositoryResponse.Data = routerDevice;

            return repositoryResponse;
        }

        public async Task UpdateRouter(RouterDevice routerDevice)
        {
            _context.Update(routerDevice);
            await _context.SaveChangesAsync();
        }
    }
}
