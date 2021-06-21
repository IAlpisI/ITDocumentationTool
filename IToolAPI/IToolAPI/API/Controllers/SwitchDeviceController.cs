using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Repositories.Generic;
using IToolAPI.Repository;
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
        private readonly IGenericRepository<SwitchDevice> genericRepository;
        private readonly IMapper mapper;
        public SwitchDeviceController(IGenericRepository<SwitchDevice> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<SwitchExport>>> Export()
        {
            var response = await genericRepository.GetAllAsync("General");
            var swtichDevices = response.Select(x => mapper.Map<SwitchExport>(x)).ToList();

            return Ok(swtichDevices);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<SwitchDeviceDTO>>> Get()
        {
            var response = await genericRepository.GetAllAsync("General");
            var swtichDevices = response.Select(x => mapper.Map<SwitchDeviceDTO>(x)).ToList();

            return Ok(swtichDevices);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<SwitchDevice>> Get(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General,PowerConsumer,FormFactor");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(SwitchDevice switchDevice)
        {
            var response = await genericRepository.CreateAsync(switchDevice);

            return Ok(response.Id);
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
        public async Task<ActionResult<int>> Put(SwitchDevice switchDevice)
        {
            await genericRepository.UpdateAsync(switchDevice);

            return NoContent();
        }
    }
}
