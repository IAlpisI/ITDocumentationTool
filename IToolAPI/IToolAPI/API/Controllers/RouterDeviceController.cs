using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
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
    public class RouterDeviceController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public RouterDeviceController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<RouterExport>>> Export()
        {
            var router = await context.RouterDevices
                .Include(x => x.General)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                .ToListAsync();

            var routerExport = router.Select(x => mapper.Map<RouterExport>(x)).ToList();

            if (routerExport == null)
            {
                return NotFound();
            }

            return routerExport;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<RouterDeviceDTO>>> Get()
        {
            var routerDevice = await context.RouterDevices
                .Select(p => new RouterDeviceDTO()
                {
                    Id = p.Id,
                    Title = p.General.Title,
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

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<RouterDevice>> Get(int id)
        {
            var routerDevice = await context.RouterDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x => x.LayerThreeNetworks)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                //.Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync();

            if (routerDevice == null)
            {
                return NotFound();
            }

            return routerDevice;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(RouterDevice routerDevice)
        {
            context.Add(routerDevice);
            await context.SaveChangesAsync();
            return routerDevice.Id;
        }

        [Authorize(Roles = "Admin, Manager")]
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

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(RouterDevice routerDevice)
        {
            context.Update(routerDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addnetwork")]
        public async Task<ActionResult<RouterDevice>> PostNetwork(LayerThreeNetwork network)
        {
            context.Add(network);
            await context.SaveChangesAsync();
            var routerDevice = await context.RouterDevices.Where(x => x.Id == network.RouterDeviceId)
                .Include(x => x.LayerThreeNetworks)
                .FirstOrDefaultAsync();
            if (routerDevice != null) return routerDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatenetwork")]
        public async Task<ActionResult<RouterDevice>> PutNetwork(LayerThreeNetwork network)
        {
            context.Update(network);
            await context.SaveChangesAsync();
            var routerDevice = await context.RouterDevices.Where(x => x.Id == network.RouterDeviceId)
                .Include(x => x.LayerThreeNetworks)
                .FirstOrDefaultAsync();
            if (routerDevice != null) return routerDevice;
            return NoContent();
        }
    }
}
