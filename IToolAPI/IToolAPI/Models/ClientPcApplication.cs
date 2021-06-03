using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class ClientPcApplication
    {
        public int? ClientPcId { get; set; }
        public ClientPc ClientPc { get; set; }
        public int? ApplicationId { get; set; }
        public Application Application { get; set; }
    }
}
