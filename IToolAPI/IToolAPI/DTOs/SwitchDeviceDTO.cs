using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class SwitchDeviceDTO
    {
        public int Id { get; set; }
        public General General { get; set; }
        public string Vlan { get; set; }
        public string Role { get; set; }
        public string SpanningTree { get; set; }
    }
}
