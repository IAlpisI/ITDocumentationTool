using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerDeviceController : Controller
    {
        private readonly IServerRepository serverRepository;
        public ServerDeviceController(IServerRepository serverRepository)
        {
            this.serverRepository = serverRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<ServerExport>>> Export()
        {
            return Ok(await serverRepository.ExportServerData());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ServerDeviceDTO>>> Get()
        {
            return Ok(await serverRepository.GetAllServers());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServerDevice>> Get(int id)
        {
            var response = await serverRepository.GetSingleServer(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return response.Data;
        }


        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(ServerDevice serverDevice)
        {
            var response = await serverRepository.CreateSerer(serverDevice);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addmemory")]
        public async Task<ActionResult<ServerDevice>> Post(Memory memory)
        {
            return Ok(await serverRepository.AddMemory(memory));
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatememory")]
        public async Task<ActionResult<ServerDevice>> Put(Memory memory)
        {
            return Ok(await serverRepository.UpdateMemory(memory));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("memory/{id}")]
        public async Task<ActionResult> DeleteMemory(int id)
        {
            await serverRepository.DeleteMemory(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addcpu")]
        public async Task<ActionResult<ServerDevice>> PostCpu(Cpu cpu)
        {
            return Ok(await serverRepository.CreateCPU(cpu));
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatecpu")]
        public async Task<ActionResult<ServerDevice>> PutCpu(Cpu cpu)
        {
            return Ok(await serverRepository.UpdateCPU(cpu));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("cpu/{id}")]
        public async Task<ActionResult> DeleteCpu(int id)
        {
            await serverRepository.DeleteCPU(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addpowerconsumer")]
        public async Task<ActionResult<ServerDevice>> PostPowerConsumer(PowerConsumer powerConsumer)
        {
            return Ok(await serverRepository.AddPowerConsumer(powerConsumer));
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatepowerconsumer")]
        public async Task<ActionResult<ServerDevice>> PutPowerConsumer(PowerConsumer powerConsumer)
        {
            return Ok(await serverRepository.UpdatePowerConsumer(powerConsumer));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("powerconsumer/{id}")]
        public async Task<ActionResult> DeletePowerConsumer(int id)
        {
            await serverRepository.DeletePowerConsumer(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await serverRepository.DeleteServer(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(ServerDevice serverDevice)
        {
            await serverRepository.UpdateServer(serverDevice);

            return NoContent();
        }
    }
}
