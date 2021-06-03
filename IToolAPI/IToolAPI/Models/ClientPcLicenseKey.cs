using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class ClientPcLicenseKey
    {
        public int? ClientPcId { get; set; }
        public ClientPc ClientPc { get; set; }
        public int? LicenseKeyId { get; set; }
        public LicenseKey LicenseKey { get; set; }
    }
}
