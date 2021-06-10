using AutoMapper;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IToolAPI.Repository
{
    public class PersonRepository : IPersonRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IMapper _mapper;
        public PersonRepository(ApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<RepositoryResponse<int>> CreatePerson(Person person)
        {
            var repositoryResponse = new RepositoryResponse<int>();

            _context.Add(person);
            await _context.SaveChangesAsync();
            repositoryResponse.Data = person.Id;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<Person>>> DeletePerson(int id)
        {
            var repositoryResponse = new RepositoryResponse<List<Person>>();
            try
            {
                var people = _context.People
                    .Include(x => x.General)
                    .FirstOrDefault(x => x.Id == id);

                if (people != null)
                {
                    if (people.General != null) { _context.Generals.Remove(people.General); }
                    _context.People.Remove(people);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    repositoryResponse.Message = "Person not found";
                    repositoryResponse.Success = false;
                }
            }
            catch (Exception ex)
            {
                repositoryResponse.Message = ex.Message;
                repositoryResponse.Success = false;
            }

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<PersonExport>>> ExportPersonData()
        {
            var repositoryResponse = new RepositoryResponse<List<PersonExport>>();

            var people = await _context.People
                .Select(p => _mapper.Map<PersonExport>(p))
                .ToListAsync();
            repositoryResponse.Data = people;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<List<PersonDTO>>> GetAllPeople()
        {
            var repositoryResponse = new RepositoryResponse<List<PersonDTO>>();

            var people = await _context.People
                .Include(p => p.General)
                .Select(p => _mapper.Map<PersonDTO>(p))
                .ToListAsync();
            repositoryResponse.Data = people;

            return repositoryResponse;
        }

        public async Task<RepositoryResponse<Person>> GetSinglePerson(int id)
        {
            var repositoryResponse = new RepositoryResponse<Person>();
            var person = await _context.People
                .Include(x => x.General)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (person == null)
            {
                repositoryResponse.Message = "Person not found";
                repositoryResponse.Success = false;

                return repositoryResponse;
            }

            repositoryResponse.Data = person;

            return repositoryResponse;
        }

        public async Task UpdatePerson(Person person)
        {
            _context.Update(person);
            await _context.SaveChangesAsync();
        }
    }
}
