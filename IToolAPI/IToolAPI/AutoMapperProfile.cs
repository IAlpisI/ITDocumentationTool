using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Application, ApplicationDTO>();
            CreateMap<LicenseKey, LicenseKeyResponse>();

            CreateMap<ServerDevice, ApplicationDTO>();
            CreateMap<ClientPc, ApplicationDTO>();
            CreateMap<ServerDevice, LicenseKeyResponse>();
            CreateMap<ClientPc, LicenseKeyResponse>();

            CreateMap<ClientPc, ClientExport>().IncludeMembers(c => c.PowerConsumer, c => c.General);
            CreateMap<General, ClientExport>();
            CreateMap<PowerConsumer, ClientExport>()
                .ForMember(dest => dest.PowerTitle, act => act.MapFrom(x => x.Title));

            CreateMap<RouterDevice, RouterExport>().IncludeMembers(c => c.PowerConsumer, c => c.General, c => c.FormFactor);
            CreateMap<General, RouterExport>();
            CreateMap<FormFactor, RouterExport>();
            CreateMap<PowerConsumer, RouterExport>()
                .ForMember(dest => dest.PowerTitle, act => act.MapFrom(x => x.Title));

            CreateMap<SwitchDevice, SwitchExport>().IncludeMembers(c => c.PowerConsumer, c => c.General, c => c.FormFactor);
            CreateMap<General, SwitchExport>();
            CreateMap<FormFactor, SwitchExport>();
            CreateMap<PowerConsumer, SwitchExport>()
                .ForMember(dest => dest.PowerTitle, act => act.MapFrom(x => x.Title));
        }
    }
}
