using IToolAPI.DTOs;
using IToolAPI.Models;
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
    public class ApplicationController : Controller
    {
        private readonly ApplicationDbContext context;
        public ApplicationController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<List<ApplicationDTO>>> Get()
        {
            var application = await context.Applications
                .Select(x => new ApplicationDTO(){ Id = x.Id, Manufacturer = x.Manufacturer, Specification = x.Specification })
                .ToListAsync();

            if (application == null)
            {
                return NotFound();
            }

            return application;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> Get(int id)
        {
            var application = await context.Applications.Where(x => x.Id == id)
                .Include(x => x.General)
                .Include(x => x.LicenseKey)
                .FirstOrDefaultAsync();

            if (application == null)
            {
                return NotFound();
            }

            return application;
        }

        [HttpPost]
        public async Task<ActionResult<int>> Post(Application application)
        {
            context.Add(application);
            await context.SaveChangesAsync();
            return application.Id;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var application = await context.Applications.FirstOrDefaultAsync(x => x.Id == id);
            if (application == null)
            {
                return NotFound();
            }

            context.Remove(application);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut]
        public async Task<ActionResult<int>> Put(Application application)
        {
            context.Update(application);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
