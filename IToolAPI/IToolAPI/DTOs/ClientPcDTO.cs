using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class ClientPcDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Pupose { get; set; }
        public string Status { get; set; }
    }
}
