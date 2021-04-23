using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class PrinterDTO
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public bool Colored { get; set; }
        public bool Duplex { get; set; }
        public string Emulation { get; set; }
        public string PaperFormat { get; set; }
    }
}
