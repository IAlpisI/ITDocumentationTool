using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class Printer
    {
        public int Id { get; set; }
        public int? GeneralId { get; set; }
        public General General { get; set; }    
        public string Type { get; set; }
        public bool Colored { get; set; }
        public bool Duplex { get; set; }
        public string Emulation { get; set; }
        public string PaperFormat { get; set; }
        public HostAddress HostAddress { get; set; }
    }
}
