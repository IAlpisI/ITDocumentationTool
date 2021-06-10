using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
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
        private readonly ISwitchRepository switchRepository;
        public SwitchDeviceController(ISwitchRepository switchRepository)
        {
            this.switchRepository = switchRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<RouterExport>>> Export()
        {
            return Ok(await switchRepository.ExportSwitchData());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<SwitchDeviceDTO>>> Get()
        {
            return Ok(await switchRepository.GetAllSwitches());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<SwitchDevice>> Get(int id)
        {
            var response = await switchRepository.GetSingleSwitch(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(SwitchDevice switchDevice)
        {
            var response = await switchRepository.CreateSwitch(switchDevice);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await switchRepository.DeleteSwitch(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(SwitchDevice switchDevice)
        {
            await switchRepository.UpdateSwitch(switchDevice);
            return NoContent();
        }
    }
}
