using IToolAPI.DTOs;
using IToolAPI.Helpers;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
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
        private readonly ApplicationDbContext context;
        public SearchController(ApplicationDbContext context)
        {
            this.context = context;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("recent")]
        public async Task<ActionResult<List<SearchRecentResponse>>> Get(SearchRecentReceive criteria)
        {
            var searchResult = new List<SearchRecentResponse>();

            if (criteria.Criteria == "added")
            {
                searchResult = await context.Generals
                    .Select(p => new SearchRecentResponse()
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Status = p.Status,
                        Purpose = p.Purpose,
                        CreationDate = p.CreatioDate.Date.ToString(),
                        ModifiedDate = p.ModifiedDate.Date.ToString()
                    })
                    .OrderByDescending(x => x.CreationDate)
                    .Take(4)
                    .ToListAsync();
            } else if (criteria.Criteria == "updated")
            {
                searchResult = await context.Generals
                    .Select(p => new SearchRecentResponse()
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Status = p.Status,
                        Purpose = p.Purpose,
                        CreationDate = p.CreatioDate.Date.ToString(),
                        ModifiedDate = p.ModifiedDate.Date.ToString()
                    })
                    .OrderByDescending(x => x.ModifiedDate)
                    .Take(5)
                    .ToListAsync();
            } else
            {
                return NoContent();
            }



            if (searchResult == null)
            {
                return NotFound();
            }

            return searchResult;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("addport")]
        public async Task<ActionResult<int>> Post(DevicePort devicePort)
        {
            context.Add(devicePort);
            await context.SaveChangesAsync();


            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpDelete("removeport/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var port = await context.DevicePorts.Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (port == null)
            {
                return NotFound();
            }

            context.Remove(port);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("updateport")]
        public async Task<ActionResult<int>> Put(DevicePort port)
        {
            context.Update(port);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getport/{id}")]
        public async Task<ActionResult<DevicePort>> Get(int id)
        {
            var port = await context.DevicePorts.Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (port == null)
            {
                return NotFound();
            }

            return port;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("getall")]
        public async Task<ActionResult<List<HostAddress>>> Get()
        {
            var hostAddresses = await context.HostAddresses
                .ToListAsync();

            if (hostAddresses == null)
            {
                return NotFound();
            }

            return hostAddresses;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("gethostaddress/{id}")]
        public async Task<ActionResult<List<HostAddressDTO>>> GetHostAddresses(int id)
        {
            var hostAddress = await context.HostAddresses
                .Where(x => x.NetworkId == id)
                .Select(x => new HostAddressDTO()
                {
                    Address = x.Address,
                    ClientPcId = x.ClientPcId,
                    Id = x.Id,
                    PrinterId = x.PrinterId,
                    RouterDeviceId = x.RouterDeviceId,
                    ServerDeviceId = x.ServerDeviceId,
                    SwitchDeviceId = x.SwitchDeviceId
                })
                .ToListAsync();

            if (hostAddress == null)
            {
                return NotFound();
            }

            return hostAddress;
        }

        [Authorize(Roles = "Admin, Manager, Editor")]
        [HttpPost("createhost")]
        public async Task<ActionResult<int>> PostHost(HostAddress hostAddress)
        {
            context.Add(hostAddress);
            await context.SaveChangesAsync();
            return hostAddress.Id;
        }

        [Authorize(Roles = "Admin, Manager")]
        [HttpPut("updatehost")]
        public async Task<ActionResult<int>> Put(HostAddress hostAddress)
        {
            context.Update(hostAddress);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("license")]
        public async Task<ActionResult<List<LicenseKeyResponse>>> GetExpiredLicenses()
        {
            var licenses = await context.LicenseKeys
                .Where(x => DateTime.Now.AddDays(30) > x.ExpireDate.Date)
                .Select(x => new LicenseKeyResponse()
                {
                    Id = x.Id,
                    KeyInformation = x.KeyInformation,
                    Serial = x.Serial
                })
                .ToListAsync();


            return licenses;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpPost("tags")]
        public async Task<ActionResult<SerachItemsDTO>> GetTaggedItems(SearchDTO search)
        {
            var foundItems = new SerachItemsDTO();
            var splitWords = search.Search.ToLower().Split(' ').ToList();

            var printers = await context.Printers
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var printerFil = printers.Where(x => x.General.Tag.Intersect(splitWords).Any())
                .Select(x => new PrinterDTO()
                { 
                    Id = x.Id,
                    PaperFormat = x.PaperFormat,
                    Title = x.General.Title,
                    Type = x.Type
                }).ToList();

            var servers = await context.ServerDevices
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var serverFil = servers.Where(x => x.General.Tag.Intersect(splitWords).Any())
                                .Select(x => new ServerDeviceDTO()
                                {
                                    Id = x.Id,
                                    Title = x.General.Title,
                                    Status = x.General.Status,
                                    Purpose = x.General.Purpose
                                })
                .ToList();

            var routers = await context.RouterDevices
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var routersFil = routers.Where(x => x.General.Tag.Intersect(splitWords).Any())
                    .Select(x => new RouterDeviceDTO()
                    {
                        Id = x.Id,
                        Title = x.General.Title,
                        GatewayAddress = x.GatewayAddress,
                        RoutingProtocol = x.RoutingProtocol
                    })
                .ToList();

            var switches = await context.SwitchDevices
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var switchesFil = switches.Where(x => x.General.Tag.Intersect(splitWords).Any())
                .Select(x => new SwitchDeviceDTO()
                {
                    Id = x.Id,
                    Title = x.General.Title,
                    Role = x.Role,
                    SpanningTree = x.SpanningTree,
                    Vlan = x.Vlan
                })
            .ToList();

            var clients = await context.ClientPc
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var clientsFil = clients.Where(x => x.General.Tag.Intersect(splitWords).Any())
                    .Select(x => new ClientPcDTO()
                    {
                        Id = x.Id,
                        Title = x.General.Title,
                        Pupose = x.General.Purpose,
                        Status = x.General.Status
                    })
            .ToList();

            var cables = await context.Cables
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var cablesFil = cables.Where(x => x.General.Tag.Intersect(splitWords).Any())
                    .Select(x => new CableDTO()
                    {
                        Id = x.Id,
                        Title = x.General.Title,
                        CableLength = x.CableLength,
                        CableType = x.CableType,
                        Status = x.General.Status
                    })
            .ToList();

            var people = await context.People
                .Where(x => x.General.Tag != null)
                .Include(x => x.General).ToListAsync();

            var peopleFil = people.Where(x => x.General.Tag.Intersect(splitWords).Any())
                    .Select(x => new PersonDTO()
                    {
                        Id = x.Id,
                        CompanyNumber = x.CompanyNumber,
                        EmailAddress = x.EmailAddress,
                        FullName = x.FullName,
                        Function = x.Function,
                        PersonalNumber = x.PersonalNumber
                    })
            .ToList();

            foundItems.Cables = cablesFil;
            foundItems.Printers = printerFil;
            foundItems.ServerDevices = serverFil;
            foundItems.RouterDevices = routersFil;
            foundItems.SwitchDevices = switchesFil;
            foundItems.ClientPcs = clientsFil;
            foundItems.People = peopleFil;

            return foundItems;
        }

        [Authorize(Roles = "Admin, Manager, Editor, User")]
        [HttpGet("defected")]
        public async Task<ActionResult<DefectedDTO>> GetDefectedItems()
        {
            var temp = new DefectedDTO();

            var servers = await context.ServerDevices
                .Where(x => x.General.Status == "Defect")
                .Select(x => new ServerDeviceDTO()
                {
                    Id = x.Id,
                    Title = x.General.Title,
                    Status = x.General.Status,
                    Purpose = x.General.Purpose
                })
                .ToListAsync();

            var routers = await context.RouterDevices
                .Where(x => x.General.Status == "Defect")
                .Select(x => new RouterDeviceDTO()
                {
                    Id = x.Id,
                    Title = x.General.Title,
                    GatewayAddress = x.GatewayAddress,
                    RoutingProtocol = x.RoutingProtocol
                })
                .ToListAsync();

            var switches = await context.SwitchDevices
                .Where(x => x.General.Status == "Defect")
                .Select(x => new SwitchDeviceDTO()
                {
                    Id = x.Id,
                    Title = x.General.Title,
                    Role = x.Role,
                    SpanningTree = x.SpanningTree,
                    Vlan = x.Vlan
                })
                .ToListAsync();

            var clients = await context.ClientPc
                    .Where(x => x.General.Status == "Defect")
                    .Select(x => new ClientPcDTO()
                    {
                        Id = x.Id,
                        Title = x.General.Title,
                        Pupose = x.General.Purpose,
                        Status = x.General.Status
                    })
                    .ToListAsync();

            var printers = await context.Printers
                .Where(x => x.General.Status == "Defect")
                .Select(x => new PrinterDTO()
                {
                    Id = x.Id,
                    Title = x.General.Title,
                    PaperFormat = x.PaperFormat,
                    Type = x.Type
                })
                .ToListAsync();

            var cables = await context.Cables
                .Where(x => x.General.Status == "Defect")
                .Select(x => new CableDTO()
                {
                    Id = x.Id,
                    Title = x.General.Title,
                    CableLength = x.CableLength,
                    CableType = x.CableType,
                    Status = x.General.Status
                })
                .ToListAsync();

            temp.ServerDevices = servers;
            temp.RouterDevices = routers;
            temp.SwitchDevices = switches;
            temp.ClientPcs = clients;
            temp.Printers = printers;
            temp.Cables = cables;

            return temp;
        }
    }
}
