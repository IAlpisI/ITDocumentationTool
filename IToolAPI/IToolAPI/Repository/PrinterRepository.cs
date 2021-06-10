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
    public class PrinterRepository : IPrinterRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public PrinterRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<RepositoryResponse<int>> CreatePrinter(Printer printer)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(printer);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = printer.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<Printer>>> DeletePrinter(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<Printer>>();
            try
            {
                var printers = _context.Printers
                    .Include(x => x.General)
                    .FirstOrDefault(x => x.Id == id);

                if (printers != null)
                {
                    if (printers.General != null) { _context.Generals.Remove(printers.General); }
                    _context.Printers.Remove(printers);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    repositoryResponse.Message = "Printer not found";
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

        public async Task<RepositoryResponse<List<PrinterExport>>> ExportPrinterData()
        {
            var repositoryResponse = new RepositoryResponse<List<PrinterExport>>();

            var printer = await _context.Printers
                .Include(p => p.General)
                .Select(p => _mapper.Map<PrinterExport>(p))
                .ToListAsync();
            repositoryResponse.Data = printer;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<PrinterDTO>>> GetAllPrinters()
        {
            var repositoryResponse = new RepositoryResponse<List<PrinterDTO>>();

            var printers = await _context.Printers
                .Include(p => p.General)
                .Select(p => _mapper.Map<PrinterDTO>(p))
                .ToListAsync();
            repositoryResponse.Data = printers;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<Printer>> GetSinglePrinter(int id)
        {
            var repositoryResponse = new RepositoryResponse<Printer>();
            var printer = await _context.Printers
                .Include(x => x.General)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (printer == null)
            {
                repositoryResponse.Message = "Printer not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }

            repositoryResponse.Data = printer;

            return repositoryResponse;
        }

        public async Task UpdatePrinter(Printer printer)
        {
            _context.Update(printer);
            await _context.SaveChangesAsync();
        }
    }
}
