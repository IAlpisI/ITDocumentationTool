using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class PersonDTO
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        public string Function { get; set; }
        public string EmailAddress { get; set; }
        public string CompanyNumber { get; set; }
        public string PersonalNumber { get; set; }
    }
}
