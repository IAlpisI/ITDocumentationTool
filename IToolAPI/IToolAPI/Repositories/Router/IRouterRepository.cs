using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IRouterRepository
    {
        Task<RouterDevice> PostNetwork(LayerThreeNetwork network);
        Task<RouterDevice> PutNetwork(LayerThreeNetwork network);
    }
}
