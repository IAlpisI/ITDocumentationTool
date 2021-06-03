using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class ServerDeviceLicenseKey
    {
        public int? ServerDeviceId { get; set; }
        public ServerDevice ServerDevice { get; set; }
        public int? LicenseKeyId { get; set; }
        public LicenseKey LicenseKey { get; set; }
    }
}
