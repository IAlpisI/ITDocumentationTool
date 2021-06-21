using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;
using System.Collections.Generic;

namespace IToolAPI.Models
{
    public class RouterDevice : BaseEntity<int>
    {
        public int? GeneralId { get; set; }
        public General General { get; set; }
        public int? FormFactorId { get; set; }
        public FormFactor FormFactor { get; set; }
        public int? PowerConsumerId { get; set; }
        public PowerConsumer PowerConsumer { get; set; }
        public string RoutingProtocol { get; set; }
        public string GatewayAddress { get; set; }
        public List<DevicePort> DevicePorts { get; set; }
        public List<LayerThreeNetwork> LayerThreeNetworks { get; set; }
    }
}
