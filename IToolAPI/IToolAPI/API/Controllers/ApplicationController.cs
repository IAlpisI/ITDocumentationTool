using IToolAPI.DTOs;
using IToolAPI.DTOs.Application;
using IToolAPI.Helpers;
using IToolAPI.Models;
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
        private readonly IApplicationRepository _applicationRepository;
        public ApplicationController(IApplicationRepository applicationRepository)
        {
            _applicationRepository = applicationRepository;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("GetAll")]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _applicationRepository.GetAllApplications());
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("{id}")]
        public async Task<ActionResult> GetSingle(int id)
        {
            var response = await _applicationRepository.GetApplicationById(id);

            if (response.Data == null) { return NotFound(response); }

            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var response = await _applicationRepository.DelteApplication(id);
            if (response == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost]
        public async Task<ActionResult> Post(Application application)
        {
            var response = await _applicationRepository.CreteApplication(application);
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut]
        public async Task<ActionResult> Put(Application application)
        {
            await _applicationRepository.UpdateApplication(application);

            return NoContent();
        }

        // Application for device

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("getapp")]
        public async Task<ActionResult> GetAppsForDevices(DeviceAppLicenseDTO data)
        {
            var response = await _applicationRepository.GetAllApplicationsForDevice(data);
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
            var response = await _applicationRepository.GetAllLicensesForDevice(data);
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
            var response = await _applicationRepository.GetLicensesForApplication(data);
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
            return Ok(await _applicationRepository.GetLicensesForApplication(id));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("license/{id}")]
        public async Task<ActionResult> GetSingleLicenses(int id)
        {
            return Ok(await _applicationRepository.GetSingleLicense(id));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("license")]
        public async Task<ActionResult> LicensePost(LicenseKey licenseKey)
        {
            return Ok(await _applicationRepository.CreateLicensesForApplication(licenseKey));
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPut("license")]
        public async Task<ActionResult<int>> Put(LicenseKey license)
        {
            await _applicationRepository.UpdateLicense(license);
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpDelete("license/{id}")]
        public async Task<ActionResult<LicenseKey>> GetLicense(int id)
        {
            var response = await _applicationRepository.RemoveLicenseFromApplication(id);
            if (response == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("serverapp")]
        public async Task<ActionResult<LicenseKey>> ChangeServerDeviceApp(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await _applicationRepository.ModifyServerDeviceApplication(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("serverlicense")]
        public async Task<ActionResult<LicenseKey>> ChangeServerDeviceLicense(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await _applicationRepository.ModifyServerDeviceLicense(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("clientapp")]
        public async Task<ActionResult<LicenseKey>> ChangeClientApplication(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await _applicationRepository.ModifyClientDeviceApplication(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("clientlicense")]
        public async Task<ActionResult<LicenseKey>> ChangeClientLicense(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = await _applicationRepository.ModifyClientDeviceDeviceLicense(softwareDeviceDTO);
            if (response.Data == null)
            {
                return NotFound(response);
            }
            return Ok(response);
        }


        //[Authorize(Roles = "Admin, Manager, Editor, User")]
        //[HttpPost("detachapp")]
        //public async Task<ActionResult<int>> DetachFromServer(ApplicationDetachReceiver data)
        //{
        //    var application = await context.Applications.FirstOrDefaultAsync(x => x.Id == data.ApplicationId);
        //    if (application == null)
        //    {
        //        return NotFound();
        //    }

        //    switch(data.DeviceName)
        //    {
        //        case "server":
        //            application.ServerDeviceId = null;
        //            break;
        //        case "client":
        //            //application.
        //            break;
        //        default: break;
        //    }

        //    return NoContent();
        //}

        //[Authorize(Roles = "Admin, Manager, Editor, User")]
        //[HttpPost("getlicense")]
        //public async Task<ActionResult<List<LicenseKey>>> GetLicenseForDevice(LicenseForDevice data)
        //{

        //    var license = await context.LicenseKeys.ToListAsync();
        //    if (license == null)
        //    {
        //        return NotFound();
        //    }

        //    switch (data.DeviceName)
        //    {
        //        case "server":
        //            var values = license.Where(x => x.ApplicationId == data.ApplicationId && x.ServerDeviceId == data.DeviceId).ToList();
        //            if (values != null)
        //            {
        //                return values;
        //            }
        //            break;
        //        case "client":
        //            //application.
        //            break;
        //        default: break;
        //    }

        //    return NoContent();
        //}

        //[Authorize(Roles = "Admin, Manager, Editor, User")]
        //[HttpPost("detachlicense")]
        //public async Task<ActionResult<int>> DetachLicense(LicenseDetachReceive data)
        //{
        //    var license = await context.LicenseKeys.FirstOrDefaultAsync(x => x.Id == data.LicenseId);
        //    if (license == null)
        //    {
        //        return NotFound();
        //    }

        //    switch (data.DeviceName)
        //    {
        //        case "server":
        //            license.ServerDeviceId = null;
        //            break;
        //        case "client":
        //            //application.
        //            break;
        //        default: break;
        //    }

        //    return NoContent();
        //}


    }
}
