﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.DTOs
{
    public class LicenseForDevice
    {
        public string DeviceName { get; set; }
        public int DeviceId { get; set; }
        public int ApplicationId { get; set; }
    }
}
