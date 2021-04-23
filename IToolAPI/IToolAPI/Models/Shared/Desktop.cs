using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class Desktop
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string KeyboardLayout { get; set; }
        public string MouseModel { get; set; }
        public string Description { get; set; }
    }
}
