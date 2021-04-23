using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class Monitor
    {
        public int Id { get; set; }
        public General General { get; set; }
        public FormFactor FormFactor { get; set; }
        public double Display { get; set; }
        public string DisplayMeasure { get; set; }
        public string Resolution { get; set; }
        public string Type { get; set; }
        public bool Pivot { get; set; }
        public bool Speaker { get; set; }
        public PowerConsumer PowerConsumer { get; set; }
    }
}
