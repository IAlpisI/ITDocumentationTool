using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;

namespace IToolAPI.Models
{
    public class Person : BaseEntity<int>
    {
        public string FullName { get; set; }
        public string Function { get; set; }
        public string EmailAddress { get; set; }
        public string CompanyNumber { get; set; }
        public string PersonalNumber { get; set; }
        public string Description { get; set; }
        public General General { get; set; }
        public int GeneralId { get; set; }
    }
}
