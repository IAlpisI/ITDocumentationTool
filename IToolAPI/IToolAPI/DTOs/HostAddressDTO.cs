using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class HostAddressDTO
    {
        public int Id { get; set; }
        public string Address { get; set; }
        public int? ClientPcId { get; set; }
        public int? PrinterId { get; set; }
        public int? ServerDeviceId { get; set; }
        public int? RouterDeviceId { get; set; }
        public int? SwitchDeviceId { get; set; }
    }
}
