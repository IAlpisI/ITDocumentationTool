using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public interface IPersonRepository
    {
        Task<RepositoryResponse<List<PersonExport>>> ExportPersonData();
        Task<RepositoryResponse<int>> CreatePerson(Person person);
        Task<RepositoryResponse<List<Person>>> DeletePerson(int id);
        Task<RepositoryResponse<List<PersonDTO>>> GetAllPeople();
        Task UpdatePerson(Person person);
        Task<RepositoryResponse<Person>> GetSinglePerson(int id);
    }
}
