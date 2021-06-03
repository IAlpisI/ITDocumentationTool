using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class SearchRecentResponse
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Purpose { get; set; }
        public string CreationDate { get; set; }
        public string ModifiedDate { get; set; }
    }
}
