using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class LayerThreeNetwork
    {
        public int Id { get; set; }
        public General General { get; set; }
        public string NetIp { get; set; }
        public string Prefix { get; set; }
        public int? RouterDeviceId { get; set; }
        public RouterDevice RouterDevice { get; set; }
    }
}
