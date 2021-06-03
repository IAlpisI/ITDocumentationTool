using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class HostAddress
    {
        public int Id { get; set; }
        public int? NetworkId { get; set; }
        public LayerThreeNetwork Network { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public int? ClientPcId { get; set; }
        public ClientPc ClientPc { get; set; }
        public int? PrinterId { get; set; }
        public Printer Printer { get; set; }
        public int? ServerDeviceId { get; set; }
        public ServerDevice ServerDevice { get; set; }
        public int? SwitchDeviceId { get; set; }
        public SwitchDevice SwitchDevice {get;set;}
        public int? RouterDeviceId { get; set; }
        public RouterDevice RouterDevice { get; set; }

    }
}
