using IToolAPI.Models.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IToolAPI.Models.Shared
{
    public class General:BaseEntity<int>
    {
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        public string Creator { get; set; }
        public string Purpose { get; set; }
        public string Status { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<string> Tag { get; set; }
        public string Description { get; set; }
    }
}
