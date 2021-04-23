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
    public class LayerThreeNetworkController : Controller
    {
        private readonly ApplicationDbContext context;
        public LayerThreeNetworkController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<LayerThreeNetwork>> Get(int id)
        {
            var network = await context.LayerThreeNetwoks.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();

            if (network == null)
            {
                return NotFound();
            }

            return network;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(LayerThreeNetwork network)
        {
            context.Add(network);
            await context.SaveChangesAsync();
            return network.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var network = await context.LayerThreeNetwoks.FirstOrDefaultAsync(x => x.Id == id);
            if (network == null)
            {
                return NotFound();
            }

            context.Remove(network);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(LayerThreeNetwork network)
        {
            context.Update(network);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
