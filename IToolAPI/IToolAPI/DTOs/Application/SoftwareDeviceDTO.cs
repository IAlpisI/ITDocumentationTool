using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs.Application
{
    public class SoftwareDeviceDTO
    {
        public int SoftwareId { get; set; }
        public int DeviceId { get; set; }
        public bool Remove { get; set; }
    }
}
