using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface INetworkRepository
    {
        LayerThreeNetwork Create(LayerThreeNetwork layerThreeNetwork);
        int Delete(int id);
        List<LayerThreeNetwork> GetAllAsync();
        LayerThreeNetwork Get(int id);
        int Update(LayerThreeNetwork layerThreeNetwork);
    }
}
