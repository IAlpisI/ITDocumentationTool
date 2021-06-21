using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;
using System.Collections.Generic;

namespace IToolAPI.Models
{
    public class SwitchDevice : BaseEntity<int>
    {
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
