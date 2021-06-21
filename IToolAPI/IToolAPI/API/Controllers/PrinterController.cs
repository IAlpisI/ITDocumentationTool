using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrinterController : Controller
    {
        private readonly IMapper mapper;
        private readonly IGenericRepository<Printer> genericRepository;
        public PrinterController(IGenericRepository<Printer> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<PrinterExport>>> Export()
        {
            var response = await genericRepository.GetAllAsync("General");
            var clients = response.Select(x => mapper.Map<ClientExport>(x)).ToList();

            return Ok(clients);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<PrinterDTO>>> Get()
        {
            var response = await genericRepository.GetAllAsync("General");
            var printers = response.Select(x => mapper.Map<PrinterDTO>(x)).ToList();

            return Ok(printers);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Printer>> Get(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Printer printer)
        {
            var response = await genericRepository.CreateAsync(printer);
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await genericRepository.DeleteAsync(id);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager=")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(Printer printer)
        {
            await genericRepository.UpdateAsync(printer);
            return NoContent();
        }
    }
}
