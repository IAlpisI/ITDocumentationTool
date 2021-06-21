using IToolAPI.Models.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class LicenseKey : BaseEntity<int>
    {
        public int Amount { get; set; }
        public string KeyInformation { get; set; }
        public string Serial { get; set; }
        public DateTime ExpireDate { get; set; }
        public double PricePerUnit { get; set; }
        public string Description { get; set; }
        public int? ApplicationId { get; set; }
        public Application Application { get; set; }
        public List<ServerDeviceLicenseKey> ServerDeviceLicenseKeys { get; set; }
        public List<ClientPcLicenseKey> ClientPcLicenseKeys { get; set; }
        
    }
}
