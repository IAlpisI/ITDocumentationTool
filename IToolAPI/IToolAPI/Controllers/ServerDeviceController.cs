using IToolAPI.DTOs;
using IToolAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerDeviceController : Controller
    {
        private readonly ApplicationDbContext context;
        public ServerDeviceController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ServerDeviceDTO>>> Get()
        {
            var serverDevice = await context.serverDevices
                .Select(p => new ServerDeviceDTO()
                {
                    Id = p.Id,
                    Purpose = p.General.Purpose,
                    Status = p.General.Status,
                    Title = p.General.Title
                })
                .ToListAsync();

            if (serverDevice == null)
            {
                return NotFound();
            }

            return serverDevice;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ServerDevice>> Get(int id)
        {
            var serverDevice = await context.serverDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x=>x.FormFactor)
                .Include(x => x.Cpu)
                .Include(x => x.Memory)
                .Include(x => x.PowerConsumer)
                .FirstOrDefaultAsync();

            if (serverDevice == null)
            {
                return NotFound();
            }

            return serverDevice;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(ServerDevice serverDevice)
        {
            context.Add(serverDevice);
            await context.SaveChangesAsync();
            return serverDevice.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var serverDevice = await context.serverDevices.FirstOrDefaultAsync(x => x.Id == id);
            if (serverDevice == null)
            {
                return NotFound();
            }

            context.Remove(serverDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(ServerDevice serverDevice)
        {
            context.Update(serverDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
