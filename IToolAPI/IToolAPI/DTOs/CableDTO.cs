using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class CableDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } 
        public string Status { get; set; }
        public string CableType {get;set;}
        public string CableLength { get; set; }
      
    }
}
