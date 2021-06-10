using IToolAPI.DTOs;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface ISearchRepository
    {
        Task<RepositoryResponse<List<SearchRecentResponse>>> GetResultsByCriteria(SearchRecentReceive criteria);
        Task CreateDevicePort(DevicePort devicePort);
        Task<RepositoryResponse<int>> DeleteDevicePort(int id);
        Task UpdateDevicePort(DevicePort port);
        Task<RepositoryResponse<DevicePort>> GetDevicePort(int id);
        Task<RepositoryResponse<List<HostAddress>>> GetHostAddress();
        Task<RepositoryResponse<List<HostAddressDTO>>> GetHostAddresses(int id);
        Task CreateHost(HostAddress hostAddress);
        Task UpdateHost(HostAddress hostAddress);
        Task<RepositoryResponse<List<LicenseKeyResponse>>> GetExpiredLicenses();
        Task<RepositoryResponse<SerachItemsDTO>> GetTaggedItems(SearchDTO search);
        Task<RepositoryResponse<DefectedDTO>> GetDefectedItems();
    }
}
