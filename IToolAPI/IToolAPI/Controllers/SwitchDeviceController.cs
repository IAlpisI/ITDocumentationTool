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
    public class SwitchDeviceController : Controller
    {
        private readonly ApplicationDbContext context;
        public SwitchDeviceController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<SwitchDeviceDTO>>> Get()
        {
            var switchDevice = await context.SwitchDevices
                .Select(p => new SwitchDeviceDTO()
                {
                    Id = p.Id,
                    General = p.General,
                    Role = p.Role,
                    SpanningTree = p.SpanningTree,
                })
                .ToListAsync();

            if (switchDevice == null)
            {
                return NotFound();
            }

            return switchDevice;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SwitchDevice>> Get(int id)
        {
            var switchDevice = await context.SwitchDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();

            if (switchDevice == null)
            {
                return NotFound();
            }

            return switchDevice;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(SwitchDevice switchDevice)
        {
            context.Add(switchDevice);
            await context.SaveChangesAsync();
            return switchDevice.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var switchDevice = await context.SwitchDevices.FirstOrDefaultAsync(x => x.Id == id);
            if (switchDevice == null)
            {
                return NotFound();
            }

            context.Remove(switchDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(SwitchDevice switchDevice)
        {
            context.Update(switchDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
