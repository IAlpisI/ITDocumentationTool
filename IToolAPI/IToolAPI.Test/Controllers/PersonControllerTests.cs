using AutoMapper;
using IToolAPI.Controllers;
using IToolAPI.DTOs;
using IToolAPI.DTOs.Exports;
using IToolAPI.Models;
using IToolAPI.Models.Shared;
using IToolAPI.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace IToolAPI.Test.Controllers
{

    public class PersonControllerTests
    {
        private readonly Mock<IPersonRepository> _mockRepo;
        private readonly PersonController _controller;
        private readonly Person person;
        private readonly PersonDTO personDTO;
        private readonly General general;

        public PersonControllerTests()
        {
            _mockRepo = new Mock<IPersonRepository>();
            _controller = new PersonController(_mockRepo.Object);

            general = new General
            {
                Id = 1,
                Description = "",
                Purpose = "",
                Status = "",
                Tag = new List<string> { "contact", "operational" },
                Title = "Contact",
                CreationDate = DateTime.Today,
                ModifiedDate = DateTime.Today
            };

            person = new Person
            {
                Id = 1,
                CompanyNumber = "213524",
                Description = "",
                EmailAddress = "",
                FullName = "Ruk Ruk",
                Function = "",
                PersonalNumber = "",
                GeneralId = general.Id
            };

            personDTO = new PersonDTO
            {
                Id = 1,
                CompanyNumber = "",
                EmailAddress = "",
                FullName = "",
                Function = "",
                PersonalNumber = ""
            };
        }

        [Fact]
        public async Task GetPerson_ShouldReturnDataIfResponseIsSuccess()
        {
            var response = new RepositoryResponse<Person>
            {
                Success = true,
                Data = person
            };

            _mockRepo.Setup(r => r.GetSinglePerson(1))
                .ReturnsAsync(response);

            var result = await _controller.GetPerson(1);

            Assert.Equal(person.Id, result.Value.Id);
        }

        [Fact]
        public async Task GetPerson_ShouldNotReturnDataIfResponseIsNotSuccessful()
        {
            var response = new RepositoryResponse<Person>
            {
                Success = false,
                Data = null
            };

            _mockRepo.Setup(r => r.GetSinglePerson(1))
                .ReturnsAsync(response);

            var result = await _controller.GetPerson(1);
            var notFoundRequestResult = Assert.IsType<ActionResult<Person>>(result);
            Assert.Null(result.Value);
        }

        [Fact]
        public async Task GetAll_ShouldReturnAllData()
        {
            var response = new RepositoryResponse<List<PersonDTO>>
            {
                Success = true,
                Data = new List<PersonDTO> { personDTO }
            };

            _mockRepo.Setup(r => r.GetAllPeople())
                .ReturnsAsync(response);

            var result = await _controller.GetAll();
            var test = Assert.IsType<ActionResult<List<PersonDTO>>>(result);
            Assert.Single(result.Value);
        }

        [Fact]
        public async Task CreatePerson_ShouldReturnID()
        {
            var response = new RepositoryResponse<int>
            {
                Data = 1
            };

            _mockRepo.Setup(r => r.CreatePerson(person))
                .ReturnsAsync(response);

            var result = await _controller.CreatePerson(person);

            Assert.IsType<ActionResult<int>>(result);
            Assert.Equal(person.Id, result.Value);
        }

        [Fact]
        public async Task Export_ShouldExportAllData()
        {
            var result = await _controller.Export();
            Assert.IsType<ActionResult<List<PersonExport>>>(result);
        }

    }
}
