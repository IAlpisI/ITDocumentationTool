using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.Models;
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
    public class LayerThreeNetworkController : Controller
    {
        private readonly IMapper mapper;
        private readonly IGenericRepository<LayerThreeNetwork> genericRepository;
        public LayerThreeNetworkController(IMapper mapper, IGenericRepository<LayerThreeNetwork> networkRepository)
        {
            this.genericRepository = networkRepository;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<LayerThreeNetworkDTO>>> GetNetworks()
        {
            var response = await genericRepository.GetAllAsync();
            var cableItems = response.Select(x => mapper.Map<LayerThreeNetworkDTO>(x)).ToList();

            return Ok(cableItems);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<LayerThreeNetwork>> Get(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(LayerThreeNetwork network)
        {
            var response = await genericRepository.CreateAsync(network);

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
        public async Task<ActionResult<int>> Put(LayerThreeNetwork network)
        {
            await genericRepository.UpdateAsync(network);

            return NoContent();
        }
    }
}
