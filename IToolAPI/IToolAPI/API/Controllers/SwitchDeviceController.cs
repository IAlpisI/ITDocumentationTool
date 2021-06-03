using AutoMapper;
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
    public class SwitchDeviceController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public SwitchDeviceController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<RouterExport>>> Export()
        {
            var switchDevice = await context.RouterDevices
                .Include(x => x.General)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                .ToListAsync();

            var switchExport = switchDevice.Select(x => mapper.Map<RouterExport>(x)).ToList();

            if (switchExport == null)
            {
                return NotFound();
            }

            return switchExport;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<SwitchDeviceDTO>>> Get()
        {
            var switchDevice = await context.SwitchDevices
                .Select(p => new SwitchDeviceDTO()
                {
                    Id = p.Id,
                    Title = p.General.Title,
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

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<SwitchDevice>> Get(int id)
        {
            var switchDevice = await context.SwitchDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x => x.PowerConsumer)
                .Include(x => x.FormFactor)
                .Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync();

            if (switchDevice == null)
            {
                return NotFound();
            }

            return switchDevice;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(SwitchDevice switchDevice)
        {
            context.Add(switchDevice);
            await context.SaveChangesAsync();
            return switchDevice.Id;
        }

        [Authorize(Roles = "Admin, Manager")]
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

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(SwitchDevice switchDevice)
        {
            context.Update(switchDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
