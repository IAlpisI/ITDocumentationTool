using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IPrinterRepository
    {
        Task<RepositoryResponse<List<PrinterExport>>> ExportPrinterData();
        Task<RepositoryResponse<int>> CreatePrinter(Printer printer);
        Task<RepositoryResponse<List<Printer>>> DeletePrinter(int id);
        Task<RepositoryResponse<List<PrinterDTO>>> GetAllPrinters();
        Task UpdatePrinter(Printer printer);
        Task<RepositoryResponse<Printer>> GetSinglePrinter(int id);
    }
}
