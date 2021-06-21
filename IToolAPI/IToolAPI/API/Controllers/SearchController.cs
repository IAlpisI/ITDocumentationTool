using IToolAPI.DTOs;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using IToolAPI.Repositories.Generic;
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
        private readonly IGenericRepository<DevicePort> deviceRepository;
        private readonly IGenericRepository<HostAddress> hostRepository;
        private readonly ISearchRepository searchRepository;
        public SearchController(ISearchRepository searchRepository, IGenericRepository<HostAddress> hostRepository, IGenericRepository<DevicePort> deviceRepository)
        {
            this.searchRepository = searchRepository;
            this.deviceRepository = deviceRepository;
            this.hostRepository = hostRepository;
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
            var response = await deviceRepository.CreateAsync(devicePort);

            return Ok(response.Id);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("removeport/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await deviceRepository.DeleteAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("updateport")]
        public async Task<ActionResult> Put(DevicePort port)
        {
            await deviceRepository.UpdateAsync(port);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getport/{id}")]
        public async Task<ActionResult<DevicePort>> Get(int id)
        {
            var response = await deviceRepository.GetByIdAsync(x => x.Id == id);

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<HostAddress>>> Get()
        {
            var response = await hostRepository.GetAllAsync();

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("gethostaddress/{id}")]
        public async Task<ActionResult<List<HostAddressDTO>>> GetHostAddresses(int id)
        {
            var response = await searchRepository.GetHostAddresses(id);

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("createhost")]
        public async Task<ActionResult<int>> PostHost(HostAddress hostAddress)
        {
            var response = await hostRepository.CreateAsync(hostAddress);

            return Ok(response.Id);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("updatehost")]
        public async Task<ActionResult> Put(HostAddress hostAddress)
        {
            await hostRepository.UpdateAsync(hostAddress);

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
