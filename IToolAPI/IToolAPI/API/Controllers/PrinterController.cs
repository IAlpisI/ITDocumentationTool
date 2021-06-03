using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
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
        private readonly ApplicationDbContext context;
        public PrinterController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<PrinterExport>>> Export()
        {
            var people = await context.Printers
                .Select(p => new PrinterExport()
                {
                    Colored = p.Colored,
                    Duplex = p.Duplex,
                    Emulation = p.Emulation,
                    PaperFormat = p.PaperFormat,
                    Type = p.Type,
                    Purpose = p.General.Purpose,
                    Status = p.General.Status,
                    Title = p.General.Title

                })
                .ToListAsync();

            if (people == null)
            {
                return NotFound();
            }

            return people;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<PrinterDTO>>> Get()
        {
            var printer = await context.Printers
                .Select(p => new PrinterDTO()
                {
                    Id = p.Id,
                    Title = p.General.Title,
                    Type = p.Type,
                    PaperFormat = p.PaperFormat,
                })
                .ToListAsync();

            if (printer == null)
            {
                return NotFound();
            }

            return printer;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Printer>> Get(int id)
        {
            var printer = await context.Printers.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync();

            if (printer == null)
            {
                return NotFound();
            }

            return printer;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Printer printer)
        {
            context.Add(printer);
            await context.SaveChangesAsync();
            return printer.Id;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var printer = await context.Printers.FirstOrDefaultAsync(x => x.Id == id);
            if (printer == null)
            {
                return NotFound();
            }
            
            var general = await context.Generals.FirstOrDefaultAsync(x => x.Id == printer.GeneralId);
            context.Remove(printer);

            if(general == null)
            {
                return NotFound();
            }

            context.Remove(general);
            
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager=")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(Printer printer)
        {
            printer.General.ModifiedDate = DateTime.UtcNow;
            context.Update(printer);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
