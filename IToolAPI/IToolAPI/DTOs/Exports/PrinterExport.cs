using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs.Exports
{
    public class PrinterExport
    {
        public string Type { get; set; }
        public bool Colored { get; set; }
        public bool Duplex { get; set; }
        public string Emulation { get; set; }
        public string PaperFormat { get; set; }
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string Status { get; set; }
    }
}
