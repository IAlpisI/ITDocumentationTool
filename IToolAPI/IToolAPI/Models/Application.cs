using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class Application
    {
        public int Id { get; set; }
        public General General { get; set; }
        public string Specification { get; set; }
        public string Manufacturer { get; set; }
        public List<LicenseKey> LicenseKey { get; set; }
    }
}
