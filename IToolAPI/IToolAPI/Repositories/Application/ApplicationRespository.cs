using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Application;
using IToolAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public class ApplicationRespository : IApplicationRepository
    {
        private readonly IMapper _mapper;
        private readonly ApplicationDbContext _context;

        public ApplicationRespository(IMapper mapper, ApplicationDbContext context)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<RepositoryResponse<List<ApplicationDTO>>> ModifyServerDeviceApplication(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = new RepositoryResponse<List<ApplicationDTO>>();
            try
            {
                var serverDevice = await _context.ServerDevices
                    .FirstOrDefaultAsync(server => server.Id == softwareDeviceDTO.DeviceId);

                if (serverDevice == null)
                {
                    response.Success = false;
                    return response;
                }

                var application = await _context.Applications
                    .FirstOrDefaultAsync(a => a.Id == softwareDeviceDTO.SoftwareId);

                if (application == null)
                {
                    response.Success = true;
                    return response;
                }

                var serverApplication = new ServerDeviceApplication()
                {
                    Application = application,
                    ServerDevice = serverDevice
                };

                if (softwareDeviceDTO.Remove)
                {
                    _context.ServerDeviceApplications.Remove(serverApplication);
                }
                else
                {
                    await _context.ServerDeviceApplications.AddAsync(serverApplication);
                }

                await _context.SaveChangesAsync();

                var serverApp = await _context.ServerDevices
                    .Where(x => x.Id == softwareDeviceDTO.DeviceId)
                    .Include(x => x.ServerDeviceApplications)
                        .ThenInclude(x => x.Application)
                    .Select(x => x.ServerDeviceApplications)
                    .FirstOrDefaultAsync();

                response.Data = serverApp.Select(x => _mapper.Map<ApplicationDTO>(x.Application)).ToList();
            }
            catch (Exception ex)
            {
                response.Success = false;
            }

            return response;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> CreateLicensesForApplication(LicenseKey licenseKey)
        {
            var repositoryResponse = new RepositoryResponse<List<LicenseKeyResponse>>();

            _context.Add(licenseKey);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = _context.LicenseKeys
                .Where(a => a.ApplicationId == licenseKey.ApplicationId)
                .Select(x => _mapper.Map<LicenseKeyResponse>(x)).ToList();
            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> GetLicensesForApplication(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<LicenseKeyResponse>>();

            var licenses = await _context.LicenseKeys.Where(l => l.ApplicationId == id).ToListAsync();
            repositoryResponse.Data = licenses.Select(c => _mapper.Map<LicenseKeyResponse>(c)).ToList();

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<LicenseKey>> GetSingleLicense(int id)
        {
            var repositoryResponse = new RepositoryResponse<LicenseKey>();

            var license = await _context.LicenseKeys.FirstOrDefaultAsync(x => x.Id == id);
            repositoryResponse.Data = license;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> RemoveLicenseFromApplication(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<LicenseKeyResponse>>();
            try
            {
                LicenseKey license = await _context.LicenseKeys
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (license != null)
                {
                    _context.LicenseKeys.Remove(license);
                    await _context.SaveChangesAsync();
                    repositoryResponse.Data = _context.LicenseKeys.Select(x => _mapper.Map<LicenseKeyResponse>(x)).ToList();
                }
                else
                {
                    repositoryResponse.Success = false;
                }
            }
            catch (Exception ex)
            {
                repositoryResponse.Success = false;
            }
            return repositoryResponse;
        }

        public async Task UpdateApplication(Application application)
        {
            _context.Update(application);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateLicense(LicenseKey licenseKey)
        {
            _context.Update(licenseKey);
            await _context.SaveChangesAsync();
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> ModifyServerDeviceLicense(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = new RepositoryResponse<List<LicenseKeyResponse>>();
            try
            {
                var serverDevice = await _context.ServerDevices
                    .FirstOrDefaultAsync(server => server.Id == softwareDeviceDTO.DeviceId);

                if (serverDevice == null)
                {
                    response.Success = false;
                    return response;
                }

                var license = await _context.LicenseKeys
                    .FirstOrDefaultAsync(a => a.Id == softwareDeviceDTO.SoftwareId);

                if (license == null)
                {
                    response.Success = true;
                    return response;
                }

                var serverApplication = new ServerDeviceLicenseKey()
                {
                    LicenseKey = license,
                    ServerDevice = serverDevice
                };

                if (softwareDeviceDTO.Remove)
                {
                    _context.ServerDeviceLicenseKeys.Remove(serverApplication);
                }
                else
                {
                    await _context.ServerDeviceLicenseKeys.AddAsync(serverApplication);
                }

                await _context.SaveChangesAsync();

                var serverLicense = await _context.ServerDevices
                    .Where(server => server.Id == softwareDeviceDTO.DeviceId)
                    .Include(server => server.ServerDeviceLicenseKeys)
                        .ThenInclude(x => x.LicenseKey)
                    .Select(x => x.ServerDeviceLicenseKeys)
                    .FirstOrDefaultAsync();

                response.Data = serverLicense.Select(x => _mapper.Map<LicenseKeyResponse>(x.LicenseKey)).ToList();
            }
            catch (Exception ex)
            {
                response.Success = false;
            }

            return response;
        }

        public async Task<RepositoryResponse<List<ApplicationDTO>>> ModifyClientDeviceApplication(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = new RepositoryResponse<List<ApplicationDTO>>();
            try
            {
                var clientDevice = await _context.ClientPc
                    .FirstOrDefaultAsync(server => server.Id == softwareDeviceDTO.DeviceId);

                if (clientDevice == null)
                {
                    response.Success = false;
                    return response;
                }

                var application = await _context.Applications
                    .FirstOrDefaultAsync(a => a.Id == softwareDeviceDTO.SoftwareId);

                if (application == null)
                {
                    response.Success = true;
                    return response;
                }

                var clientApplication = new ClientPcApplication()
                {
                    Application = application,
                    ClientPc = clientDevice
                };

                if (softwareDeviceDTO.Remove)
                {
                    _context.ClientPcApplications.Remove(clientApplication);
                }
                else
                {
                    await _context.ClientPcApplications.AddAsync(clientApplication);
                }

                await _context.SaveChangesAsync();

                var clientApplicationdto = await _context.ClientPc
                    .Where(server => server.Id == softwareDeviceDTO.DeviceId)
                    .Include(server => server.ClientPcApplications)
                        .ThenInclude(x => x.Application)
                    .Select(x => x.ClientPcApplications)
                    .FirstOrDefaultAsync();

                response.Data = clientApplicationdto.Select(x => _mapper.Map<ApplicationDTO>(x.Application)).ToList();
            }
            catch (Exception ex)
            {
                response.Success = false;
            }

            return response;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> ModifyClientDeviceDeviceLicense(SoftwareDeviceDTO softwareDeviceDTO)
        {
            var response = new RepositoryResponse<List<LicenseKeyResponse>>();
            try
            {
                var clientDevice = await _context.ClientPc
                    .FirstOrDefaultAsync(server => server.Id == softwareDeviceDTO.DeviceId);

                if (clientDevice == null)
                {
                    response.Success = false;
                    return response;
                }

                var license = await _context.LicenseKeys
                    .FirstOrDefaultAsync(a => a.Id == softwareDeviceDTO.SoftwareId);

                if (license == null)
                {
                    response.Success = true;
                    return response;
                }

                var clientLicense = new ClientPcLicenseKey()
                {
                    LicenseKey = license,
                    ClientPc = clientDevice
                };

                if (softwareDeviceDTO.Remove)
                {
                    _context.ClienPcLicenseKeys.Remove(clientLicense);
                }
                else
                {
                    await _context.ClienPcLicenseKeys.AddAsync(clientLicense);
                }

                await _context.SaveChangesAsync();

                var clientLicensedto = await _context.ClientPc
                    .Where(server => server.Id == softwareDeviceDTO.DeviceId)
                    .Include(server => server.ClientPcLicenseKeys)
                        .ThenInclude(x => x.LicenseKey)
                    .Select(x => x.ClientPcLicenseKeys)
                    .FirstOrDefaultAsync();

                response.Data = clientLicensedto.Select(x => _mapper.Map<LicenseKeyResponse>(x.LicenseKey)).ToList();
            }
            catch (Exception ex)
            {
                response.Success = false;
            }

            return response;
        }

        public async Task<RepositoryResponse<List<ApplicationDTO>>> GetAllApplicationsForDevice(DeviceAppLicenseDTO deviceAppLicenseDTO)
        {
            var response = new RepositoryResponse<List<ApplicationDTO>>();

            switch (deviceAppLicenseDTO.DeviceName)
            {
                case "server":
                    var server = await _context.ServerDevices
                        .Where(x => x.Id == deviceAppLicenseDTO.DeviceId)
                        .Include(x => x.ServerDeviceApplications)
                            .ThenInclude(x => x.Application)
                        .Select(x => x.ServerDeviceApplications)
                        .FirstOrDefaultAsync();

                    response.Data = server.Select(x => _mapper.Map<ApplicationDTO>(x.Application)).ToList();
                    response.Success = true;

                    return response;

                case "client":
                    var client = await _context.ClientPc
                        .Where(x => x.Id == deviceAppLicenseDTO.DeviceId)
                        .Include(x => x.ClientPcApplications)
                            .ThenInclude(x => x.Application)
                        .Select(x => x.ClientPcApplications)
                        .FirstOrDefaultAsync();

                    response.Data = client.Select(x => _mapper.Map<ApplicationDTO>(x.Application)).ToList();
                    response.Success = true;

                    return response;

                default: break;
            }
            return response;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> GetAllLicensesForDevice(DeviceAppLicenseDTO deviceAppLicenseDTO)
        {
            var response = new RepositoryResponse<List<LicenseKeyResponse>>();

            switch (deviceAppLicenseDTO.DeviceName)
            {
                case "server":
                    var server = await _context.ServerDevices
                        .Where(x => x.Id == deviceAppLicenseDTO.DeviceId)
                        .Include(x => x.ServerDeviceLicenseKeys)
                            .ThenInclude(x => x.LicenseKey)
                        .Select(x => x.ServerDeviceLicenseKeys)
                        .FirstOrDefaultAsync();

                    response.Data = server.Select(x => _mapper.Map<LicenseKeyResponse>(x.LicenseKey)).ToList();
                    response.Success = true;

                    return response;

                case "client":
                    var client = await _context.ClientPc
                        .Where(x => x.Id == deviceAppLicenseDTO.DeviceId)
                        .Include(x => x.ClientPcLicenseKeys)
                            .ThenInclude(x => x.LicenseKey)
                        .Select(x => x.ClientPcLicenseKeys)
                        .FirstOrDefaultAsync();

                    response.Data = client.Select(x => _mapper.Map<LicenseKeyResponse>(x.LicenseKey)).ToList();
                    response.Success = true;

                    return response;

                default: break;
            }
            return response;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> GetLicensesForApplication(LicensesForApplicationDTO licensesForApplicationDTO)
        {
            var response = new RepositoryResponse<List<LicenseKeyResponse>>();

            switch (licensesForApplicationDTO.DeviceName)
            {
                case "server":
                    var server = await _context.ServerDevices
                        .Where(x => x.Id == licensesForApplicationDTO.DeviceId)
                        .Include(x => x.ServerDeviceLicenseKeys)
                            .ThenInclude(x => x.LicenseKey)
                        .Select(x => x.ServerDeviceLicenseKeys)
                        .FirstOrDefaultAsync();

                    response.Data = server
                        .Where(x => x.LicenseKey.ApplicationId == licensesForApplicationDTO.ApplicationId)
                        .Select(x => _mapper.Map<LicenseKeyResponse>(x.LicenseKey)).ToList();
                    response.Success = true;

                    return response;

                case "client":
                    var client = await _context.ClientPc
                        .Where(x => x.Id == licensesForApplicationDTO.DeviceId)
                        .Include(x => x.ClientPcLicenseKeys)
                            .ThenInclude(x => x.LicenseKey)
                        .Select(x => x.ClientPcLicenseKeys)
                        .FirstOrDefaultAsync();

                    response.Data = client
                        .Where(x => x.LicenseKey.ApplicationId == licensesForApplicationDTO.ApplicationId)
                        .Select(x => _mapper.Map<LicenseKeyResponse>(x.LicenseKey)).ToList();
                    response.Success = true;

                    return response;

                default: break;
            }
            return response;
        }
    }
}
