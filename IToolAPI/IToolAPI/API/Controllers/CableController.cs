using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.Models;
using IToolAPI.Repositories.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CableController : Controller
    {
        private readonly IMapper mapper;
        private readonly IGenericRepository<Cable> genericRepository;
        public CableController(IGenericRepository<Cable> genericRepository, IMapper mapper)
        {
            this.mapper = mapper;
            this.genericRepository = genericRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<CableDTO>>> GetAll()
        {
            var response = await genericRepository.GetAllAsync("General");
            var cables = response.Select(x => mapper.Map<CableDTO>(x)).ToList();

            return Ok(cables);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getfull")]
        public async Task<ActionResult<List<Cable>>> GetFullInformtionAbuotCables()
        {
            var response = await genericRepository.GetAllAsync("General");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Cable>> Get(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Cable cable)
        {
            var response = await genericRepository.CreateAsync(cable);

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
        public async Task<ActionResult<int>> Put(Cable cable)
        {
            await genericRepository.UpdateAsync(cable);

            return NoContent();
        }
    }
}
