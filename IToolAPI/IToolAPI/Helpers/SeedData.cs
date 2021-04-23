using IToolAPI.Models;
using IToolAPI.Models.Shared;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Helpers
{
    public static class SeedData
    {
        public static void Seed(this ModelBuilder builder)
        {
            builder.Entity<General>().HasData(
                new General {
                    Id = 1,
                    Description = "fasfasfsa",
                    Purpose = "fasfsafsa",
                    Status = "ffasfas",
                    Tag = new List<string> { "test", "test" },
                    Title = "fafasfas",
                    CreatioDate = DateTime.Today,
                    ModifiedDate = DateTime.Today 
                }
            );

            builder.Entity<Person>().HasData(
                    new Person
                    {
                        Id = 1,
                        CompanyNumber = "213524",
                        Description = "asfasfas",
                        EmailAddress = "afassa",
                        FullName = "asfsaffa",
                        Function = "fasfasfsa",
                        PersonalNumber = "fsdfdsgdsg",
                        GeneralId = 1
                    }
                );
        }
    }
}
