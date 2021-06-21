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
        public RouterRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<RouterDevice> PostNetwork(LayerThreeNetwork network)
        {
            _context.Add(network);
            await _context.SaveChangesAsync();

            var routerDevice = await _context.RouterDevices
                    .Include(x => x.LayerThreeNetworks)
                    .FirstOrDefaultAsync(x => x.Id == network.RouterDeviceId);


            return routerDevice;
        }

        public async Task<RouterDevice> PutNetwork(LayerThreeNetwork network)
        {
            _context.Update(network);
            await _context.SaveChangesAsync();
            var routerDevice = await _context.RouterDevices.Where(x => x.Id == network.RouterDeviceId)
                .Include(x => x.LayerThreeNetworks)
                .FirstOrDefaultAsync();

            return routerDevice;
        }

    }
}
