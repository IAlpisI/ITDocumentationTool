using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
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
    public class ClientPcController : Controller
    {
        private readonly IClientRepository clientRepository;
        public ClientPcController(IClientRepository clientRepository)
        {
            this.clientRepository = clientRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<ClientExport>>> Export()
        {
            return Ok(await clientRepository.ExportClientData());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ClientPcDTO>>> Get()
        {
            return Ok(await clientRepository.GetAllClients());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ClientPc>> GetTab(int id)
        {
            var response = await clientRepository.GetSingleClient(id);

            if(!response.Success)
            {
                return NotFound(response);
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(ClientPc clientPc)
        {
            var response = await clientRepository.CreateClient(clientPc);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await clientRepository.DeleteClient(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        public async Task<ActionResult<int>> Put(ClientPc clientPc)
        {
            await clientRepository.UpdateClient(clientPc);

            return NoContent();
        }
    }
}
