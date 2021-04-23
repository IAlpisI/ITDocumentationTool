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
    public class RouterDeviceController : Controller
    {
        private readonly ApplicationDbContext context;
        public RouterDeviceController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<RouterDeviceDTO>>> Get()
        {
            var routerDevice = await context.RouterDevices
                .Select(p => new RouterDeviceDTO()
                {
                    Id = p.Id,
                    General = p.General,
                    GatewayAddress = p.GatewayAddress,
                    RoutingProtocol = p.RoutingProtocol

                })
                .ToListAsync();

            if (routerDevice == null)
            {
                return NotFound();
            }

            return routerDevice;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RouterDevice>> Get(int id)
        {
            var routerDevice = await context.RouterDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();

            if (routerDevice == null)
            {
                return NotFound();
            }

            return routerDevice;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(RouterDevice routerDevice)
        {
            context.Add(routerDevice);
            await context.SaveChangesAsync();
            return routerDevice.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var routerDevice = await context.RouterDevices.FirstOrDefaultAsync(x => x.Id == id);
            if (routerDevice == null)
            {
                return NotFound();
            }

            context.Remove(routerDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(RouterDevice routerDevice)
        {
            context.Update(routerDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
