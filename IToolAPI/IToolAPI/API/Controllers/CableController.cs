using IToolAPI.DTOs;
using IToolAPI.Models;
using IToolAPI.Repository;
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
        private readonly ICableRepository cableRepository;
        public CableController(ICableRepository cableRepository)
        {
            this.cableRepository = cableRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult<List<CableDTO>>> Get()
        {
            var response = await cableRepository.GetAllCables();

            if(!response.Success) {
                return NoContent();
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getfull")]
        public async Task<ActionResult<List<Cable>>> GetFullInformtionAbuotCables()
        {
            var response = await cableRepository.GetCablesWithInformation();

            if (!response.Success)
            {
                return NoContent();
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Cable>> Get(int id)
        {
            var response = await cableRepository.GetCable(id);

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Cable cable)
        {
            var response = await cableRepository.CreateCable(cable);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await cableRepository.DeleteCable(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult<int>> Put(Cable cable)
        {
            await cableRepository.UpdateCable(cable);

            return NoContent();
        }
    }
}
