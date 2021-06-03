using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class DefectedDTO
    {
        public List<ServerDeviceDTO> ServerDevices { get; set; }
        public List<RouterDeviceDTO> RouterDevices { get; set; }
        public List<SwitchDeviceDTO> SwitchDevices { get; set; }
        public List<ClientPcDTO> ClientPcs { get; set; }
        public List<PrinterDTO> Printers { get; set; }
        public List<CableDTO> Cables { get; set; }
    }
}
