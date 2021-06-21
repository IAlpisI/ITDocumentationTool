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
    public class PersonController : Controller
    {
        private readonly IMapper mapper;
        private readonly IGenericRepository<Person> genericRepository;
        public PersonController(IGenericRepository<Person> genericRepository, IMapper mapper)
        {
            this.genericRepository = genericRepository;
            this.mapper = mapper;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<PersonExport>>> Export()
        {
            var response = await genericRepository.GetAllAsync("General");
            var people = response.Select(x => mapper.Map<PersonExport>(x)).ToList();

            return Ok(people);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<PersonDTO>>> GetAll()
        {
            var response = await genericRepository.GetAllAsync("General");
            var people = response.Select(x => mapper.Map<PersonDTO>(x)).ToList();

            return Ok(people);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> CreatePerson(Person person)
        {
            var response = await genericRepository.CreateAsync(person);
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
        [HttpPut]
        public async Task<ActionResult<int>> Put(Person person)
        {
            await genericRepository.UpdateAsync(person);

            return NoContent();
        }
    }
}
