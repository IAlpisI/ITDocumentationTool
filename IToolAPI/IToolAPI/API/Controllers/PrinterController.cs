using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrinterController : Controller
    {
        private readonly PrinterRepository printerRepository;
        public PrinterController(PrinterRepository printerRepository)
        {
            this.printerRepository = printerRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<PrinterExport>>> Export()
        {
            return Ok(await printerRepository.ExportPrinterData());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<PrinterDTO>>> Get()
        {
            return Ok(await printerRepository.GetAllPrinters());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Printer>> Get(int id)
        {
            var response = await printerRepository.GetSinglePrinter(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Printer printer)
        {
            var response = await printerRepository.CreatePrinter(printer);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await printerRepository.DeletePrinter(id));
        }

        [Authorize(Roles = "Admin, Manager=")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(Printer printer)
        {
            await printerRepository.UpdatePrinter(printer);

            return NoContent();
        }
    }
}
