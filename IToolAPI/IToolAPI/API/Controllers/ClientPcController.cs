using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
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
    public class ClientPcController : Controller
    {
        private readonly IMapper mapper;
        private readonly IGenericRepository<ClientPc> genericRepository;
        private readonly IClientRepository clientRepository;
        public ClientPcController(IGenericRepository<ClientPc> genericRepository, IMapper mapper, IClientRepository clientRepository)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
            this.clientRepository = clientRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<ClientExport>>> Export()
        {
            var response = await genericRepository.GetAllAsync("General,PowerConsumer");
            var clients = response.Select(x => mapper.Map<ClientExport>(x)).ToList();

            return Ok(clients);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<ClientPcDTO>>> Get()
        {
            var response = await genericRepository.GetAllAsync("General");
            var clients = response.Select(x => mapper.Map<ClientPcDTO>(x)).ToList();

            return Ok(clients);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientPc>> GetTab(int id)
        {
            var response = await clientRepository.GetSingleClient(id);

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(ClientPc clientPc)
        {
            var response = await genericRepository.CreateAsync(clientPc);
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await genericRepository.DeleteAsync(id);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        public async Task<ActionResult<int>> Put(ClientPc clientPc)
        {
            await genericRepository.UpdateAsync(clientPc);

            return NoContent();
        }
    }
}
