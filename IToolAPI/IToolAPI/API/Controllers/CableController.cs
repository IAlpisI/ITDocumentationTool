using IToolAPI.DTOs;
using IToolAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CableController : Controller
    {
        private readonly ApplicationDbContext context;
        public CableController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<CableDTO>>> Get()
        {
            var cables = await context.Cables
                .Select(p => new CableDTO()
                {
                    Id = p.Id,
                    Title = p.General.Title,
                    Status = p.General.Status,
                    CableLength = p.CableLength,
                    CableType = p.CableType
                    
                })
                .ToListAsync();

            if (cables == null)
            {
                return NotFound();
            }

            return cables;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getfull")]
        public async Task<ActionResult<List<Cable>>> GetFullInformtionAbuotCables()
        {
            var cables = await context.Cables
                .Include(x => x.General)
                .ToListAsync();

            if (cables == null)
            {
                return NotFound();
            }

            return cables;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Cable>> Get(int id)
        {
            var cables = await context.Cables.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefaultAsync();

            if (cables == null)
            {
                return NotFound();
            }

            return cables;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Cable cable)
        {
            context.Add(cable);
            await context.SaveChangesAsync();
            return cable.Id;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var cable = await context.Cables.FirstOrDefaultAsync(x => x.Id == id);
            if (cable == null)
            {
                return NotFound();
            }

            context.Remove(cable);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(Cable cable)
        {
            if (cable.General != null)
            {
                cable.General.ModifiedDate = DateTime.UtcNow;
            }

            context.Update(cable);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
