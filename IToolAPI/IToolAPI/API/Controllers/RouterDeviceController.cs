using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
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
    public class RouterDeviceController : Controller
    {
        private readonly IMapper mapper;
        private readonly IGenericRepository<RouterDevice> genericRepository;
        private readonly IRouterRepository routerRepository;
        public RouterDeviceController(IRouterRepository routerRepository, IGenericRepository<RouterDevice> genericRepository, IMapper mapper)
        {
            this.routerRepository = routerRepository;
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<RouterExport>>> Export()
        {
            var response = await genericRepository.GetAllAsync();
            var routers = response.Select(x => mapper.Map<RouterExport>(x)).ToList();

            return Ok(routers);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<RouterDeviceDTO>>> Get()
        {
            var response = await genericRepository.GetAllAsync("General");
            var routers = response.Select(x => mapper.Map<RouterDeviceDTO>(x)).ToList();

            return Ok(routers);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<RouterDevice>> Get(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General,LayerThreeNetworks,PowerConsumer,FormFactor");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(RouterDevice routerDevice)
        {
            var response = await genericRepository.CreateAsync(routerDevice);

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
        public async Task<ActionResult<int>> Put(RouterDevice routerDevice)
        {
            await genericRepository.UpdateAsync(routerDevice);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addnetwork")]
        public async Task<ActionResult<RouterDevice>> PostNetwork(LayerThreeNetwork network)
        {
            var response = await routerRepository.PostNetwork(network);

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPut("updatenetwork")]
        public async Task<ActionResult<RouterDevice>> PutNetwork(LayerThreeNetwork network)
        {
            var response = await routerRepository.PutNetwork(network);

            return Ok(response);
        }
    }
}
