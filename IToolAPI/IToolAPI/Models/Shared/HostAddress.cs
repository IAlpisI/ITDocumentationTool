using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class HostAddress
    {
        public int Id { get; set; }
        public LayerThreeNetwork Network { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }

    }
}
