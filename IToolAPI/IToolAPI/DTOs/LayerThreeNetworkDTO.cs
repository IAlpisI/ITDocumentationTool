using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class LayerThreeNetworkDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string NetIp { get; set; }
        public string Prefix { get; set; }
        public int? RouterDeviceId { get; set; }
    }
}
