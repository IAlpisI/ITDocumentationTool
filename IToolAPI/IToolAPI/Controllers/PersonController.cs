using IToolAPI.DTOs;
using IToolAPI.Helpers;
using IToolAPI.Models;
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
        private readonly ApplicationDbContext context;
        public PersonController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [Authorize(Policy = Policies.Admin)]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<PersonDTO>>> Get()
        {
            var people = await context.People
                .Select(p => new PersonDTO()
                {
                    Id = p.Id,
                    FullName = p.FullName,
                    Function = p.Function,
                    EmailAddress = p.EmailAddress,
                    CompanyNumber = p.CompanyNumber,
                    PersonalNumber = p.PersonalNumber
                })
                .ToListAsync();

            if (people == null)
            {
                return NotFound();
            }

            return people;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Person>> Get(int id)
        {
            var person = await context.People.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();

            if (person == null)
            {
                return NotFound();
            }

            return person;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(Person person)
        {
            context.Add(person);
            await context.SaveChangesAsync();
            return person.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var person = await context.People.FirstOrDefaultAsync(x => x.Id == id);
            if (person == null)
            {
                return NotFound();
            }

            context.Remove(person);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(Person person)
        {
            context.Update(person);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
