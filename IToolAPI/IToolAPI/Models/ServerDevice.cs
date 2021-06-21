using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;
using System.Collections.Generic;

namespace IToolAPI.Models
{
    public class ServerDevice : BaseEntity<int>
    {
        public int GeneralId { get; set; }
        public General General { get; set; }
        public int FormFactorId { get; set; }
        public FormFactor FormFactor { get; set; }
        public List<Cpu> Cpu { get; set; }
        public List<PowerConsumer> PowerConsumer { get; set; }
        public List<Memory> Memory { get; set; }
        public HostAddress HostAddress { get; set; }
        public List<DevicePort> DevicePorts {get;set;}
        public List<ServerDeviceApplication> ServerDeviceApplications { get; set; }
        public List<ServerDeviceLicenseKey> ServerDeviceLicenseKeys { get; set; }
    }
}
