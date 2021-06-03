using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class LicenseKeyResponse
    {
        public int Id { get; set; }
        public string KeyInformation { get; set; }
        public string Serial { get; set; }
    }
}
