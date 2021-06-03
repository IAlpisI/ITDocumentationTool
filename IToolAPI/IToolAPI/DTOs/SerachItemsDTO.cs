using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class SerachItemsDTO
    {
        public List<ServerDeviceDTO> ServerDevices { get; set; }
        public List<RouterDeviceDTO> RouterDevices { get; set; }
        public List<SwitchDeviceDTO> SwitchDevices { get; set; }
        public List<ClientPcDTO> ClientPcs { get; set; }
        public List<PrinterDTO> Printers { get; set; }
        public List<CableDTO> Cables { get; set; }
        public List<PersonDTO> People { get; set; }
    }
}