using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class ServerDeviceApplication
    {
        public int? ServerDeviceId { get; set; }
        public ServerDevice ServerDevice { get; set; }
        public int? ApplicationId { get; set; }
        public Application Application { get; set; }
    }
}
