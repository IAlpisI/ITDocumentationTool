using IToolAPI.DTOs;
using IToolAPI.Models;
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

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<PrinterDTO>>> Get()
        {
            var printer = await context.Printers
                .Select(p => new PrinterDTO()
                {
                    Id = p.Id,
                    Colored = p.Colored,
                    Duplex = p.Duplex,
                    Emulation = p.Emulation,
                    PaperFormat = p.PaperFormat,
                })
                .ToListAsync();

            if (printer == null)
            {
                return NotFound();
            }

            return printer;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Printer>> Get(int id)
        {
            var printer = await context.Printers.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();

            if (printer == null)
            {
                return NotFound();
            }

            return printer;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(Printer printer)
        {
            context.Add(printer);
            await context.SaveChangesAsync();
            return printer.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var printer = await context.Printers.FirstOrDefaultAsync(x => x.Id == id);
            if (printer == null)
            {
                return NotFound();
            }

            var general = await context.Generals.FirstOrDefaultAsync(x => x.Id == printer.Generald);

            if(general == null)
            {
                return NotFound();
            }

            context.Remove(general);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(Printer printer)
        {
            context.Update(printer);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
