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
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public ClientRepository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<RepositoryResponse<int>> CreateClient(ClientPc clientPc)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(clientPc);
            await _context.SaveChangesAsync();
            repositoryResponse.Data =  clientPc.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<ClientPc>>> DeleteClient(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<ClientPc>>();

            try
            {
                var client = _context.ClientPc
                    .Include(x => x.General)
                    .Include(x => x.Cpu)
                    .Include(x => x.Memory)
                    .Include(x => x.PowerConsumer)
                    .Include(x => x.HostAddress)
                    .FirstOrDefault(x => x.Id == id);

                if (client != null)
                {
                    if(client.General != null) { _context.Generals.Remove(client.General); }
                    if(client.Cpu != null) { _context.Cpus.Remove(client.Cpu); }
                    if(client.Memory != null) { _context.Memories.Remove(client.Memory); }
                    if(client.PowerConsumer != null) { _context.PowerConsumers.Remove(client.PowerConsumer); }
                    if(client.HostAddress != null) { _context.HostAddresses.Remove(client.HostAddress); }

                    _context.ClientPc.Remove(client);
                    await _context.SaveChangesAsync();
                    repositoryResponse.Data = _context.ClientPc.ToList();
                }
                else
                {
                    repositoryResponse.Message = "Client not found";
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

        public async Task<RepositoryResponse<List<ClientExport>>> ExportClientData()
        {
            var repositoryResponse = new RepositoryResponse<List<ClientExport>>();

            var clients = await _context.ClientPc
                .Include(x => x.General)
                .Include(x => x.PowerConsumer)
                .ToListAsync();

            var peopleExport = clients.Select(x => _mapper.Map<ClientExport>(x)).ToList();

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<ClientPcDTO>>> GetAllClients()
        {
            var repositoryResponse = new RepositoryResponse<List<ClientPcDTO>>();

            var clientpc = await _context.ClientPc
                .Select(x => _mapper.Map<ClientPcDTO>(x))
                .ToListAsync();

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<ClientPc>> GetSingleClient(int id)
        {
            var repositoryResponse = new RepositoryResponse<ClientPc>();

            var clientpc = await _context.ClientPc
                .Include(x => x.General)
                .Include(x => x.Cpu)
                .Include(x => x.Memory)
                .Include(x => x.PowerConsumer)
                .Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (clientpc == null)
            {
                repositoryResponse.Success = false;
                repositoryResponse.Message = "Client nor found";

                return repositoryResponse;
            }

            return repositoryResponse;
        }

        public async Task UpdateClient(ClientPc clientPc)
        {
            _context.Update(clientPc);
            await _context.SaveChangesAsync();
        }
    }
}
