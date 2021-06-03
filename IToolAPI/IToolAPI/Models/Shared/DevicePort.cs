using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class DevicePort
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Type {get;set;}
        public string Model { get; set; }
        public string Plug { get; set; }
        public string Speed { get; set; }
        public string SpeedMeassure { get; set; }
        public string Description { get; set; }
        public int? ServerDeviceId { get; set; }
        public int? RouterDeviceId { get; set; }
        public int? SwitchDeviceId { get; set; }

    }
}
