using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models.Shared
{
    public class General
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }
        public string Creator { get; set; }
        public string Purpose { get; set; }
        public string Status { get; set; }
        public DateTime CreatioDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public List<string> Tag { get; set; }
        public string Description { get; set; }

        public General()
        {
            CreatioDate = DateTime.UtcNow;
            ModifiedDate = DateTime.UtcNow;
        }

        public int ClinetPcId { get; set; }
        public ClientPc ClientPc { get; set; }
    }
}
