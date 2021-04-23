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
    public class ClientPcController : Controller
    {
        private readonly ApplicationDbContext context;
        public ClientPcController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ClientPcDTO>>> Get()
        {
            var clientpc = await context.ClientPc
                .Select(p => new ClientPcDTO()
                {
                    Id = p.Id,
                    Title = p.General.Title,
                    Status = p.General.Status,
                    Pupose = p.General.Purpose
                })
                .ToListAsync();

            if (clientpc == null)
            {
                return NotFound();
            }

            return clientpc;
        }

        //[HttpGet("formedit/{id}")]
        //public async Task<ActionResult<ClientPc>> GetForm(int id)
        //{
        //    var clientpc = await context.ClientPc.Where(x => x.Id == id)
        //        .Include(x => x.General)
        //        .FirstOrDefaultAsync();

        //    if (clientpc == null)
        //    {
        //        return NotFound();
        //    }

        //    return clientpc;
        //}

        [HttpGet("{id}")]
        public async Task<ActionResult<ClientPc>> GetTab(int id)
        {
            var clientpc = await context.ClientPc.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x => x.Cpu)
                .Include(x => x.Memory)
                .Include(x => x.PowerConsumer)
                //.Include(x => x.Application)
                //.Include(x => x.LicenseKey)
                .FirstOrDefaultAsync();

            if (clientpc == null)
            {
                return NotFound();
            }

            return clientpc;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(ClientPc clientpc)
        {
            context.Add(clientpc);
            await context.SaveChangesAsync();
            return clientpc.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var clientpc = await context.ClientPc.FirstOrDefaultAsync(x => x.Id == id);
            if (clientpc == null)
            {
                return NotFound();
            }

            context.Remove(clientpc);
            await context.SaveChangesAsync();
            return NoContent();
        }

        public async Task<ActionResult<int>> Put(ClientPc clientPc)
        {
            context.Update(clientPc);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
