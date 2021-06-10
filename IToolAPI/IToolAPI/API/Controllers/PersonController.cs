using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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
    public class PersonController : Controller
    {
        private readonly IPersonRepository personRepository;
        public PersonController(IPersonRepository personRepository)
        {
            this.personRepository = personRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("export")]
        public async Task<ActionResult<List<PersonExport>>> Export()
        {
            return Ok(await personRepository.ExportPersonData());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<PersonDTO>>> GetAll()
        {
            return Ok(await personRepository.GetAllPeople());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> GetPerson(int id)
        {
            var response = await personRepository.GetSinglePerson(id);

            if (!response.Success)
            {
                return NotFound(response);
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> CreatePerson(Person person)
        {
            var response = await personRepository.CreatePerson(person);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await personRepository.DeletePerson(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(Person person)
        {
            await personRepository.UpdatePerson(person);

            return NoContent();
        }
    }
}
