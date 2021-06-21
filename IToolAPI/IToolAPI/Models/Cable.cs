using IToolAPI.Models.Base;
using IToolAPI.Models.Shared;

namespace IToolAPI.Models
{
    public class Cable: BaseEntity<int>
    {
        public int? GeneralId { get; set; }
        public General General { get; set; }
        public string CableType { get; set; }
        public string CableLength { get; set; }
        public string CableLengthMeasure { get; set; }
        public string Color { get; set; }
        public string Description { get; set; }
        public int? StartPortId { get; set; }
        public DevicePort StartPort { get; set; }
        public int? EndPortId { get; set; }
        public DevicePort EndPort { get; set; }
    }
}
