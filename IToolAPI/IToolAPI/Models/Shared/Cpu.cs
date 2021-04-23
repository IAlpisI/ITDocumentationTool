using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class Cpu
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int CpuCores { get; set; }
        public string Manufacturer { get; set; }
        public string Type { get; set; }
        public double CpuFrequency { get; set; }
        public string CpuFrequencyType { get; set; }
        public string Description { get; set; }

        public int? ServerDeviceId { get; set; }
        public ServerDevice ServerDevice { get; set; }
    }
}
