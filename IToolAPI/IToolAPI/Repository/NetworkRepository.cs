using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IToolAPI.DTOs;
using IToolAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace IToolAPI.Repository
{
    public class NetworkRepository : INetworkRepository
    {
        private readonly ApplicationDbContext _context;
        public NetworkRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public LayerThreeNetwork Create(LayerThreeNetwork layerThreeNetwork)
        {
            _context.Add(layerThreeNetwork);
            layerThreeNetwork.Id =  _context.SaveChanges();

            return layerThreeNetwork;
        }

        public int Delete(int id)
        {
            var network =  _context.LayerThreeNetwoks.FirstOrDefaultAsync(x => x.Id == id);
            if (network == null)
            {
                return 0;
            }

            _context.Remove(network);
             _context.SaveChangesAsync();
            return id;
        }

        public LayerThreeNetwork Get(int id)
        {
            var network = _context.LayerThreeNetwoks.Where(x => x.Id == id)
                .Include(x => x.General)
                .FirstOrDefault();

            if (network == null)
            {
                return null;
            }

            return network;
        }

        public  Task<List<LayerThreeNetwork>> GetAllAsync()
        {
            var application =  _context.LayerThreeNetwoks
                    .ToListAsync();

            if (application == null)
            {
                return null;
            }

            return application;
        }

        public int Update(LayerThreeNetwork layerThreeNetwork)
        {
            _context.Update(layerThreeNetwork);
            _context.SaveChangesAsync();
            return 0;
        }

        List<LayerThreeNetwork> INetworkRepository.GetAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
