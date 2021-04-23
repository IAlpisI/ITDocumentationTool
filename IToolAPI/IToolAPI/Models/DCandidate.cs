using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class DCandidate
    {
        [Key]
        public int id { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string fullName { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string mobille { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string email { get; set; }
        [Column(TypeName = "varchar(100)")]
        public int age { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string bloodGroup { get; set; }
        [Column(TypeName = "varchar(100)")]
        public string address { get; set; }
    }
}
