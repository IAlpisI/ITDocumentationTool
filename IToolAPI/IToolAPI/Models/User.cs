using IToolAPI.Models.Base;
using System.Text.Json.Serialization;

namespace IToolAPI.Models
{
    public class User : BaseEntity<int>
    {
        public string Name { get; set; }
        public string Username { get; set; }
        [JsonIgnore]
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
