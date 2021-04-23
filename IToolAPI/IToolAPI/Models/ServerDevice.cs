using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Models
{
    public class ServerDevice
    {
        public int Id { get; set; }
        public int GeneralId { get; set; }
        public General General { get; set; }
        public int FormFactorId { get; set; }
        public FormFactor FormFactor { get; set; }
        public List<Cpu> Cpu { get; set; }
        public List<PowerConsumer> PowerConsumer { get; set; }
        public List<Memory> Memory { get; set; }


        //public HostAddress HostAddress { get; set; }
    }
}
