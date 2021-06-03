using IToolAPI.DTOs;
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
    public class LayerThreeNetworkController : Controller
    {
        private readonly ApplicationDbContext context;
        public LayerThreeNetworkController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<LayerThreeNetworkDTO>>> Get()
        {
            var application = await context.LayerThreeNetwoks
                .Select(x => new LayerThreeNetworkDTO() { 
                    Id=x.Id,
                    Title=x.General.Title,
                    NetIp=x.NetIp,
                    Prefix=x.Prefix,
                    RouterDeviceId = x.RouterDeviceId
                }
                )
                .ToListAsync();

            if (application == null)
            {
                return NotFound();
            }

            return application;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
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

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(LayerThreeNetwork network)
        {
            context.Add(network);
            await context.SaveChangesAsync();
            return network.Id;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var network = await context.LayerThreeNetwoks.FirstOrDefaultAsync(x => x.Id == id);
            if (network == null)
            {
                return NotFound();
            }

            var hosts = await context.HostAddresses.Where(x => x.NetworkId == id).ToListAsync();
            context.RemoveRange(hosts);
            context.Remove(network);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(LayerThreeNetwork network)
        {
            context.Update(network);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
