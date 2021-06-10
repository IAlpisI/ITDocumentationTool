using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public class CableRepository : ICableRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public CableRepository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<RepositoryResponse<int>> CreateCable(Cable cable)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(cable);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = cable.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<Cable>>> DeleteCable(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<Cable>>();

            try
            {
                var cable = _context.Cables
                    .Include(x => x.General)
                    .FirstOrDefault(x => x.Id == id);

                if(cable != null)
                {
                    if(cable.General != null) { _context.Generals.Remove(cable.General); }
                    _context.Cables.Remove(cable);
                    await _context.SaveChangesAsync();
                    repositoryResponse.Data = _context.Cables.ToList();
                }
                else
                {
                    repositoryResponse.Message = "Cable not found";
                    repositoryResponse.Success = false;
                }
            }
            catch(Exception ex)
            {
                repositoryResponse.Message = ex.Message;
                repositoryResponse.Success = false;
            }

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<CableDTO>>> GetAllCables()
        {
            var repositoryResponse = new RepositoryResponse<List<CableDTO>>();
            var cables = await _context.Cables
                .Include(x => x.General)
                .Select(x => _mapper.Map<CableDTO>(x)).ToListAsync();
            repositoryResponse.Data = cables;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<Cable>> GetCable(int id)
        {
            var repositoryResponse = new RepositoryResponse<Cable>();
                var cable = await _context.Cables
                    .Include(x => x.General)
                    .FirstOrDefaultAsync(x => x.Id == id);

            if (cable == null)
            {
                repositoryResponse.Message = "Cable not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }

            repositoryResponse.Data = cable;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<Cable>>> GetCablesWithInformation()
        {
            var repositoryResponse = new RepositoryResponse<List<Cable>>();

            var cables = await _context.Cables
                .Include(x => x.General)
                .ToListAsync();

            if (cables == null)
            {
                repositoryResponse.Message = "Cables not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }
            repositoryResponse.Data = cables;

            return repositoryResponse;
        }

        public async Task UpdateCable(Cable cable)
        {
            if (cable.General != null)
            {
                cable.General.ModifiedDate = DateTime.UtcNow;
            }

            _context.Update(cable);
            await _context.SaveChangesAsync();
        }
    }
}
