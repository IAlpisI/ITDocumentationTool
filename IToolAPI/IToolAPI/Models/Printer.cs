using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;

namespace IToolAPI.Models
{
    public class Printer : BaseEntity<int>
    {
        public int? GeneralId { get; set; }
        public General General { get; set; }    
        public string Type { get; set; }
        public bool Colored { get; set; }
        public bool Duplex { get; set; }
        public string Emulation { get; set; }
        public string PaperFormat { get; set; }
        public HostAddress HostAddress { get; set; }
    }
}
