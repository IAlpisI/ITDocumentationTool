using IToolAPI.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class Memory : BaseEntity<int>
    {
        public string Title { get; set; }
        public string Manufacturer { get; set; }
        public string Type { get; set; }
        public string Capacity { get; set; }
        public string CapacityType { get; set; }
        public string Description { get; set; }
        public int? ServerDeviceId { get; set; }
        public ServerDevice ServerDevice { get; set; }
    }
}
