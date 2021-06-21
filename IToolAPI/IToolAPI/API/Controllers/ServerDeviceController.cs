using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using IToolAPI.Repositories.Generic;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServerDeviceController : Controller
    {
        private readonly IGenericRepository<ServerDevice> genericRepository;
        private readonly IServerRepository serverRepository;
        private readonly IMapper mapper;
        public ServerDeviceController(IServerRepository serverRepository, IGenericRepository<ServerDevice> genericRepository, IMapper mapper)
        {
            this.serverRepository = serverRepository;
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<ServerExport>>> Export()
        {
            var response = await genericRepository.GetAllAsync("General");
            var serverDevices = response.Select(x => mapper.Map<ServerExport>(x)).ToList();

            return Ok(serverDevices);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<ServerDeviceDTO>>> Get()
        {
            var response = await genericRepository.GetAllAsync("General");
            var serverDevices = response.Select(x => mapper.Map<ServerDeviceDTO>(x)).ToList();

            return Ok(serverDevices);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ServerDevice>> Get(int id)
        {
            var response = await serverRepository.GetSingleServer(id);

            return Ok(response);
        }


        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(ServerDevice serverDevice)
        {
            var response = await genericRepository.CreateAsync(serverDevice);

            return Ok(response.Id);
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
            await genericRepository.DeleteAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(ServerDevice serverDevice)
        {
            await genericRepository.UpdateAsync(serverDevice);

            return NoContent();
        }
    }
}
