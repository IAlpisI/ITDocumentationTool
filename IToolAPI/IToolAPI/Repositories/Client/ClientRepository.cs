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
    public class ClientRepository:IClientRepository
    {
        private readonly ApplicationDbContext _context;

        public ClientRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<ClientPc> GetSingleClient(int id)
        {
            var clientpc = await _context.ClientPc
                .Include(x => x.General)
                .Include(x => x.Cpu)
                .Include(x => x.Memory)
                .Include(x => x.PowerConsumer)
                .Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync(x => x.Id == id);

            return clientpc;
        }
    }
}
