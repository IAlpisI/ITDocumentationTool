using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using Microsoft.AspNetCore.Authorization;
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

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<ServerExport>>> Export()
        {
            var server = await context.ServerDevices
                .Select(p => new ServerExport()
                {
                    Depth = p.FormFactor.Depth,
                    DimensionUnit = p.FormFactor.DimesnsionUnit,
                    Height = p.FormFactor.Height,
                    Name = p.FormFactor.Name,
                    Weight = p.FormFactor.Weight,
                    WeightMeasure = p.FormFactor.WeightMeasure,
                    Width = p.FormFactor.Width,
                    Title = p.General.Title,
                    Purpose = p.General.Purpose,
                    Status = p.General.Status,
                })
                .ToListAsync();

            if (server == null)
            {
                return NotFound();
            }

            return server;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ServerDeviceDTO>>> Get()
        {
            var serverDevice = await context.ServerDevices
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

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServerDevice>> Get(int id)
        {
            var serverDevice = await context.ServerDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x=>x.FormFactor)
                .Include(x => x.Cpu)
                .Include(x => x.Memory)
                .Include(x => x.PowerConsumer)
                .Include(x => x.DevicePorts)
                .Include(x => x.ServerDeviceApplications)
                .Include(x => x.ServerDeviceLicenseKeys)
                .Include(x => x.HostAddress).ThenInclude(x => x.Network)
                .FirstOrDefaultAsync();

            if (serverDevice == null)
            {
                return NotFound();
            }

            return serverDevice;
        }


        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(ServerDevice serverDevice)
        {
            context.Add(serverDevice);
            await context.SaveChangesAsync();
            return serverDevice.Id;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addmemory")]
        public async Task<ActionResult<ServerDevice>> Post(Memory memory)
        {
            context.Add(memory);
            await context.SaveChangesAsync();
            var serverDevice = await context.ServerDevices.Where(x => x.Id == memory.ServerDeviceId)
                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();
            if (serverDevice != null) return serverDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatememory")]
        public async Task<ActionResult<ServerDevice>> Put(Memory memory)
        {
            context.Update(memory);
            await context.SaveChangesAsync();
            var serverDevice = await context.ServerDevices.Where(x => x.Id == memory.ServerDeviceId)
                .Include(x => x.Memory)
                 .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();
            if (serverDevice != null) return serverDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("memory/{id}")]
        public async Task<ActionResult> DeleteMemory(int id)
        {
            var memory = await context.Memories.FirstOrDefaultAsync(x => x.Id == id);
            if (memory == null)
            {
                return NotFound();
            }

            context.Remove(memory);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addcpu")]
        public async Task<ActionResult<ServerDevice>> PostCpu(Cpu cpu)
        {
            context.Add(cpu);
            await context.SaveChangesAsync();
            var serverDevice = await context.ServerDevices.Where(x => x.Id == cpu.ServerDeviceId)
                                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();
            if (serverDevice != null) return serverDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatecpu")]
        public async Task<ActionResult<ServerDevice>> PutCpu(Cpu cpu)
        {
            context.Update(cpu);
            await context.SaveChangesAsync();
            var serverDevice = await context.ServerDevices.Where(x => x.Id == cpu.ServerDeviceId)
                                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();
            if (serverDevice != null) return serverDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("cpu/{id}")]
        public async Task<ActionResult> DeleteCpu(int id)
        {
            var cpu = await context.Cpus.FirstOrDefaultAsync(x => x.Id == id);
            if (cpu == null)
            {
                return NotFound();
            }

            context.Remove(cpu);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addpowerconsumer")]
        public async Task<ActionResult<ServerDevice>> PostPowerConsumer(PowerConsumer powerConsumer)
        {
            context.Add(powerConsumer);
            await context.SaveChangesAsync();
            var serverDevice = await context.ServerDevices.Where(x => x.Id == powerConsumer.ServerDeviceId)
                                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();
            if (serverDevice != null) return serverDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatepowerconsumer")]
        public async Task<ActionResult<ServerDevice>> PutPowerConsumer(PowerConsumer powerConsumer)
        {
            context.Update(powerConsumer);
            await context.SaveChangesAsync();
            var serverDevice = await context.ServerDevices.Where(x => x.Id == powerConsumer.ServerDeviceId)
                                .Include(x => x.Memory)
                .Include(x => x.DevicePorts)
                .Include(x => x.Cpu)
                .Include(x => x.PowerConsumer)
                .Include(x => x.General)
                .Include(x => x.FormFactor)
                .FirstOrDefaultAsync();
            if (serverDevice != null) return serverDevice;
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("powerconsumer/{id}")]
        public async Task<ActionResult> DeletePowerConsumer(int id)
        {
            var powerConsumer = await context.PowerConsumers.FirstOrDefaultAsync(x => x.Id == id);
            if (powerConsumer == null)
            {
                return NotFound();
            }

            context.Remove(powerConsumer);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var serverDevice = await context.ServerDevices.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();

            if (serverDevice == null)
            {
                return NotFound();
            }

            context.Remove(serverDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(ServerDevice serverDevice)
        {
            context.Update(serverDevice);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
