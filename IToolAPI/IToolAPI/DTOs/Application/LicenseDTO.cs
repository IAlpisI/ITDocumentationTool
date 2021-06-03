using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class LicenseDTO
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string KeyInformation { get; set; }
        public DateTime ExpireDate { get; set; }
        public double PricePerUnit { get; set; }
        public string Description { get; set; }
        public int ApplicationId { get; set; }
    }
}
