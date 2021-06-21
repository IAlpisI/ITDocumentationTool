using IToolAPI.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class PowerConsumer : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Manufacturer { get; set; }
        public string PowerModel { get; set; }
        public double Volt { get; set; }
        public double Watt { get; set; }
        public double Ampere { get; set; }
        public string Description { get; set; }

        public int? ServerDeviceId { get; set; }
        public ServerDevice ServerDevice { get; set; }
    }
}
