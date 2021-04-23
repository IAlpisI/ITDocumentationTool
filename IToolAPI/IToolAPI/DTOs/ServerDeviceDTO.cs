using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class ServerDeviceDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string Status { get; set; }
    }
}
