using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Application;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Repositories.Generic;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IMapper mapper;
        private readonly IApplicationRepository applicationRepository;
        private readonly IGenericRepository<Application> genericRepository;
        public ApplicationController(IMapper mapper, IApplicationRepository applicationRepository, IGenericRepository<Application> genericRepository)
        {
            this.mapper = mapper;
            this.applicationRepository = applicationRepository;
            this.genericRepository = genericRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<ApplicationDTO>>> GetAll()
        {
            var response = await genericRepository.GetAllAsync();
            var applications = response.Select(x => mapper.Map<ApplicationDTO>(x)).ToList();

            return Ok(applications);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult<Application>> GetSingle(int id)
        {
            var response = await genericRepository.GetByIdAsync(x => x.Id == id, "General,LicenseKey");

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await genericRepository.DeleteAsync(id);

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult<int>> Post(Application application)
        {
            var response = await genericRepository.CreateAsync(application);

            return Ok(response.Id);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult> Put(Application application)
        {
            await genericRepository.UpdateAsync(application);

            return NoContent();
        }

        // Application for device

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("getapp")]
        public async Task<ActionResult> GetAppsForDevices(DeviceAppLicenseDTO data)
        {
            var response = await applicationRepository.GetAllApplicationsForDevice(data);
            if(response != null)
            {
                return Ok(response);
            }

            return NoContent();
        }

        //License for device

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("getlicense")]
        public async Task<ActionResult> GetLicensesForDevices(DeviceAppLicenseDTO data)
        {
            var response = await applicationRepository.GetAllLicensesForDevice(data);
            if (response != null)
            {
                return Ok(response);
            }

            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("getapplicense")]
        public async Task<ActionResult> GetLicensesForApplciation(LicensesForApplicationDTO data)
        {
            var response = await applicationRepository.GetLicensesForApplication(data);
            if (response != null)
            {
                return Ok(response);
            }

            return NoContent();
        }

        //LICENSE

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("licenses/{id}")]
        public async Task<ActionResult> GetAllLicenses(int id)
        {
            return Ok(await applicationRepository.GetLicensesForApplication(id));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("license/{id}")]
        public async Task<ActionResult> GetSingleLicenses(int id)
        {
            return Ok(await applicationRepository.GetSingleLicense(id));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("license")]
        public async Task<ActionResult> LicensePost(LicenseKey licenseKey)
        {
            return Ok(await applicationRepository.CreateLicensesForApplication(licenseKey));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPut("license")]
        public async Task<ActionResult<int>> Put(LicenseKey license)
        {
            await applicationRepository.UpdateLicense(license);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpDelete("license/{id}")]
        public async Task<ActionResult<LicenseKey>> GetLicense(int id)
        {
            var response = await applicationRepository.RemoveLicenseFromApplication(id);
            if (response == null)
            {
                return NotFound(response);
            }
            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("serverapp")]
        public async Task<ActionResult<LicenseKey>> ChangeServerDeviceApp(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await applicationRepository.ModifyServerDeviceApplication(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("serverlicense")]
        public async Task<ActionResult<LicenseKey>> ChangeServerDeviceLicense(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await applicationRepository.ModifyServerDeviceLicense(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("clientapp")]
        public async Task<ActionResult<LicenseKey>> ChangeClientApplication(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await applicationRepository.ModifyClientDeviceApplication(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response.Data);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("clientlicense")]
        public async Task<ActionResult<LicenseKey>> ChangeClientLicense(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await applicationRepository.ModifyClientDeviceDeviceLicense(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response.Data);
        }
    }
}
