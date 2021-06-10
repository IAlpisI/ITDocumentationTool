using IToolAPI.DTOs;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly ISearchRepository searchRepository;
        public SearchController(ISearchRepository searchRepository)
        {
            this.searchRepository = searchRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("recent")]
        public async Task<ActionResult<List<SearchRecentResponse>>> Get(SearchRecentReceive criteria)
        {
            var response = await searchRepository.GetResultsByCriteria(criteria);
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addport")]
        public async Task<ActionResult<int>> Post(DevicePort devicePort)
        {
            await searchRepository.CreateDevicePort(devicePort);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("removeport/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return Ok(await searchRepository.DeleteDevicePort(id));
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("updateport")]
        public async Task<ActionResult> Put(DevicePort port)
        {
            await searchRepository.UpdateDevicePort(port);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getport/{id}")]
        public async Task<ActionResult<DevicePort>> Get(int id)
        {
            var response = await searchRepository.GetDevicePort(id);
            if (!response.Success)
            {
                return NoContent();
            }

            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<HostAddress>>> Get()
        {
            var response = await searchRepository.GetHostAddress();
            return response.Data;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("gethostaddress/{id}")]
        public async Task<ActionResult<List<HostAddressDTO>>> GetHostAddresses(int id)
        {
            return Ok(await searchRepository.GetHostAddresses(id));
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("createhost")]
        public async Task<ActionResult> PostHost(HostAddress hostAddress)
        {
            await searchRepository.CreateHost(hostAddress);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("updatehost")]
        public async Task<ActionResult> Put(HostAddress hostAddress)
        {
            await searchRepository.UpdateHost(hostAddress);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("license")]
        public async Task<ActionResult<List<LicenseKeyResponse>>> GetExpiredLicenses()
        {
            return Ok(await searchRepository.GetExpiredLicenses());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("tags")]
        public async Task<ActionResult<SerachItemsDTO>> GetTaggedItems(SearchDTO search)
        {
            return Ok(await searchRepository.GetTaggedItems(search));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("defected")]
        public async Task<ActionResult<DefectedDTO>> GetDefectedItems()
        {
            return Ok(await searchRepository.GetDefectedItems());
        }
    }
}
