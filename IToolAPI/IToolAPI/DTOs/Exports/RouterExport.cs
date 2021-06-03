using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs.Exports
{
    public class RouterExport
    {
        public string Title { get; set; }
        public string Purpose { get; set; }
        public string Status { get; set; }
        public string Name { get; set; }
        public string DimensionUnit { get; set; }
        public double Width { get; set; }
        public double Height { get; set; }
        public double Depth { get; set; }
        public double Weight { get; set; }
        public string WeightMeasure { get; set; }
        public string PowerTitle { get; set; }
        public string Manufacturer { get; set; }
        public string PowerModel { get; set; }
        public double Volt { get; set; }
        public double Watt { get; set; }
        public double Ampere { get; set; }
        public string RoutingProtocol { get; set; }
        public string GatewayAddress { get; set; }
    }
}
