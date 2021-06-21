using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class ClientPc : BaseEntity<int>
    {
        public string KeyboardLayout { get; set; }
        public string Display { get; set; }
        public string DisplayMeasure { get; set; }
        public string Resolution { get; set; }
        public General General { get; set; }
        public int? GeneralId { get; set; }
        public int? MemoryId {get;set;}
        public Memory Memory { get; set; }
        public int? CpuId { get; set; }
        public Cpu Cpu { get; set; }
        public int? PowerConsumerId { get; set; }
        public PowerConsumer PowerConsumer { get; set; }
        public HostAddress HostAddress { get; set; }
        public List<ClientPcApplication> ClientPcApplications { get; set; }
        public List<ClientPcLicenseKey> ClientPcLicenseKeys { get; set; }
    }
}
