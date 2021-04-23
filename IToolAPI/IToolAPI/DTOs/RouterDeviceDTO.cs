using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class RouterDeviceDTO
    {
        public int Id { get; set; }
        public General General { get; set; }
        public string RoutingProtocol { get; set; }
        public string GatewayAddress { get; set; }
    }
}
