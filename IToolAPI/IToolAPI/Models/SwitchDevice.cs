using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class SwitchDevice
    {
        public int Id { get; set; }
        public int? GeneralId { get; set; }
        public General General { get; set; }
        public int? FormFactorId { get; set; }
        public FormFactor FormFactor { get; set; }
        public int? PowerConsumerId { get; set; }
        public PowerConsumer PowerConsumer { get; set; }
        public string Vlan { get; set; }
        public string Role { get; set; }
        public string SpanningTree { get; set; }
        public List<DevicePort> DevicePorts { get; set; }
        public HostAddress HostAddress { get; set; }
    }
}
