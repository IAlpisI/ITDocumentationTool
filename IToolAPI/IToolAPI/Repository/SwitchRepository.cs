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
    public class SwitchRepository : ISwitchRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public SwitchRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<RepositoryResponse<int>> CreateSwitch(SwitchDevice switchDevice)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(switchDevice);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = switchDevice.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<SwitchDevice>>> DeleteSwitch(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<SwitchDevice>>();
            try
            {
                var switcheDevices = _context.SwitchDevices
                    .Include(x => x.General)
                    .Include(x => x.PowerConsumer)
                    .Include(x => x.FormFactor)
                    .FirstOrDefault(x => x.Id == id);

                if (switcheDevices != null)
                {
                    if (switcheDevices.General != null) { _context.Generals.Remove(switcheDevices.General); }
                    if (switcheDevices.PowerConsumer != null) { _context.PowerConsumers.Remove(switcheDevices.PowerConsumer); }
                    if (switcheDevices.FormFactor != null) { _context.FormFactors.Remove(switcheDevices.FormFactor); }
                    _context.SwitchDevices.Remove(switcheDevices);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    repositoryResponse.Message = "Switch not found";
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

        public async Task<RepositoryResponse<List<SwitchExport>>> ExportSwitchData()
        {
            var repositoryResponse = new RepositoryResponse<List<SwitchExport>>();

            var switchDevice = await _context.SwitchDevices
                .Include(x => x.General)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                .Select(p => _mapper.Map<SwitchExport>(p))
                .ToListAsync();
            repositoryResponse.Data = switchDevice;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<SwitchDeviceDTO>>> GetAllSwitches()
        {
            var repositoryResponse = new RepositoryResponse<List<SwitchDeviceDTO>>();

            var switchDevices = await _context.SwitchDevices
                .Include(x => x.General)
                .Select(p => _mapper.Map<SwitchDeviceDTO>(p))
                .ToListAsync();
            repositoryResponse.Data = switchDevices;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<SwitchDevice>> GetSingleSwitch(int id)
        {
            var repositoryResponse = new RepositoryResponse<SwitchDevice>();
            var switchDevices = await _context.SwitchDevices
                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .Include(x => x.PowerConsumer)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (switchDevices == null)
            {
                repositoryResponse.Message = "Switch not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }

            repositoryResponse.Data = switchDevices;

            return repositoryResponse;
        }

        public async Task UpdateSwitch(SwitchDevice switchDevice)
        {
            _context.Update(switchDevice);
            await _context.SaveChangesAsync();
        }
    }
}
