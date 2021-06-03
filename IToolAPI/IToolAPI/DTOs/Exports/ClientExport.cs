using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs.Exports
{
    public class ClientExport
    {
        public string KeyboardLayout { get; set; }
        public string Display { get; set; }
        public string DisplayMeasure { get; set; }
        public string Resolution { get; set; }
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string Status { get; set; }
        public string PowerTitle { get; set; }
        public string Manufacturer { get; set; }
        public string PowerModel { get; set; }
        public double Volt { get; set; }
        public double Watt { get; set; }
        public double Ampere { get; set; }
    }
}
