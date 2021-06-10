using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
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
    public class RouterDeviceController : Controller
    {
        private readonly IRouterRepository routerReposetory;
        public RouterDeviceController(IRouterRepository routerRepository)
        {
            this.routerReposetory = routerRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<RouterExport>>> Export()
        {
            return Ok(await routerReposetory.ExportRouterData());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<RouterDeviceDTO>>> Get()
        {
            return Ok(await routerReposetory.GetAllRouters());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<RouterDevice>> Get(int id)
        {
            var response = await routerReposetory.GetSingleRouter(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(RouterDevice routerDevice)
        {
            var response = await routerReposetory.CreateRouter(routerDevice);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await routerReposetory.DeleteRouter(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(RouterDevice routerDevice)
        {
            await routerReposetory.UpdateRouter(routerDevice);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addnetwork")]
        public async Task<ActionResult<RouterDevice>> PostNetwork(LayerThreeNetwork network)
        {
            var response = await routerReposetory.PostNetwork(network);

            if(response.Data == null)
            {
                return NoContent();
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatenetwork")]
        public async Task<ActionResult<RouterDevice>> PutNetwork(LayerThreeNetwork network)
        {
            var response = await routerReposetory.PutNetwork(network);

            if (response.Data == null)
            {
                return NoContent();
            }

            return response.Data;
        }
    }
}
