using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public class SearchRepository : ISearchRepository
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public SearchRepository(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        public async Task<RepositoryResponse<DefectedDTO>> GetDefectedItems()
        {
            var repositoryResponse = new RepositoryResponse<DefectedDTO>();
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
            repositoryResponse.Data = temp;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<LicenseKeyResponse>>> GetExpiredLicenses()
        {
            var repositoryResponse = new RepositoryResponse<List<LicenseKeyResponse>>();
            var licenses = await context.LicenseKeys
                .Where(x => DateTime.Now.AddDays(30) > x.ExpireDate.Date)
                .Select(x => mapper.Map<LicenseKeyResponse>(x))
                .ToListAsync();
            repositoryResponse.Data = licenses;

            return repositoryResponse;
        }

        public async Task<List<HostAddressDTO>> GetHostAddresses(int id)
        {
            var hostAddress = await context.HostAddresses
                .Where(x => x.NetworkId == id)
                .Select(x => mapper.Map<HostAddressDTO>(x))
                .ToListAsync();

            return hostAddress;
        }

        public async Task<RepositoryResponse<List<SearchRecentResponse>>> GetResultsByCriteria(SearchRecentReceive criteria)
        {
            var repositoryResponse = new RepositoryResponse<List<SearchRecentResponse>>();
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
                        CreationDate = p.CreationDate.Date.ToString(),
                        ModifiedDate = p.ModifiedDate.Date.ToString()
                    })
                    .OrderByDescending(x => x.CreationDate)
                    .Take(3)
                    .ToListAsync();
            }
            else if (criteria.Criteria == "updated")
            {
                searchResult = await context.Generals
                    .Select(p => new SearchRecentResponse()
                    {
                        Id = p.Id,
                        Title = p.Title,
                        Status = p.Status,
                        Purpose = p.Purpose,
                        CreationDate = p.CreationDate.Date.ToString(),
                        ModifiedDate = p.ModifiedDate.Date.ToString()
                    })
                    .OrderByDescending(x => x.ModifiedDate)
                    .Take(3)
                    .ToListAsync();
            }
            else
            {
                repositoryResponse.Success = false;

                return repositoryResponse;
            }


            if (searchResult == null)
            {
                repositoryResponse.Success = false;

                return repositoryResponse;
            }
            repositoryResponse.Data = searchResult;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<SerachItemsDTO>> GetTaggedItems(SearchDTO search)
        {
            var repositoryResponse = new RepositoryResponse<SerachItemsDTO>();
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
            repositoryResponse.Data = foundItems;

            return repositoryResponse;
        }
    }
}
