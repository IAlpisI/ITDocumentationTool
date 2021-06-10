using IToolAPI.DTOs;
using IToolAPI.Models;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LayerThreeNetworkController : Controller
    {
        private readonly INetworkRepository networkRepository;
        public LayerThreeNetworkController(INetworkRepository networkRepository)
        {
            this.networkRepository = networkRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<LayerThreeNetworkDTO>>> GetNetworks()
        {
            var response = await networkRepository.GetAllNetworks();
            if(!response.Success)
            {
                return NoContent();
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<LayerThreeNetwork>> Get(int id)
        {
            var response = await networkRepository.GetSingleNetwork(id);
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(LayerThreeNetwork network)
        {
            var response = await networkRepository.CreateNetwork(network);
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await networkRepository.DeleteNetwork(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(LayerThreeNetwork network)
        {
            await networkRepository.UpdateNetwork(network);

            return NoContent();
        }
    }
}
