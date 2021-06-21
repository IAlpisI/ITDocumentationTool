using IToolAPI.DTOs;
using IToolAPI.DTOs.Application;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IApplicationRepository
    {
        //Get applications for all device
        Task<RepositoryResponse<List<ApplicationDTO>>> GetAllApplicationsForDevice(DeviceAppLicenseDTO deviceAppLicenseDTO);

        //Get licenses for all devices
        Task<RepositoryResponse<List<LicenseKeyResponse>>> GetAllLicensesForDevice(DeviceAppLicenseDTO deviceAppLicenseDTO);
        //LICENSE
        Task<RepositoryResponse<List<LicenseKeyResponse>>> GetLicensesForApplication(int id);
        Task<RepositoryResponse<LicenseKey>> GetSingleLicense(int id);
        Task<RepositoryResponse<List<LicenseKeyResponse>>> CreateLicensesForApplication(LicenseKey licenseKey);
        Task<RepositoryResponse<List<LicenseKeyResponse>>> RemoveLicenseFromApplication(int id);
        Task UpdateLicense(LicenseKey licenseKey);
        //ServerDeviceApplication
        Task<RepositoryResponse<List<ApplicationDTO>>> ModifyServerDeviceApplication(SoftwareDeviceDTO softwareDeviceDTO);
        //ServerDeviceLicense
        Task<RepositoryResponse<List<LicenseKeyResponse>>> ModifyServerDeviceLicense(SoftwareDeviceDTO softwareDeviceDTO);
        //DeviceApplication
        Task<RepositoryResponse<List<ApplicationDTO>>> ModifyClientDeviceApplication(SoftwareDeviceDTO softwareDeviceDTO);
        //DeviceLicense
        Task<RepositoryResponse<List<LicenseKeyResponse>>> ModifyClientDeviceDeviceLicense(SoftwareDeviceDTO softwareDeviceDTO);
        //LicensesForApplication
        Task<RepositoryResponse<List<LicenseKeyResponse>>> GetLicensesForApplication(LicensesForApplicationDTO licensesForApplicationDTO);


    }
}
