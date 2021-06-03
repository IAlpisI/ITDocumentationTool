using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class PortReceiveData
    {
        public string DeviceName { get; set; }
        public DevicePort DevicePort { get; set; }
    }
}
