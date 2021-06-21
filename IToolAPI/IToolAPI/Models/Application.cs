using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class Application : BaseEntity<int>
    {
        public General General { get; set; }
        public string Specification { get; set; }
        public string Manufacturer { get; set; }
        public List<ClientPcApplication> ClientPcApplications { get; set; }
        public List<ServerDeviceApplication> ServerDeviceApplications { get; set; }
        public List<LicenseKey> LicenseKey { get; set; }
    }
}
