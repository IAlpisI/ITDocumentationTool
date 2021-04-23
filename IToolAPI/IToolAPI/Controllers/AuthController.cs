using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IToolAPI.Data;
using IToolAPI.DTOs;
using IToolAPI.Helpers;
using IToolAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace IToolAPI.Controllers
{
    [Route(template: "api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;

        public AuthController(IUserRepository repository, JwtService jwtService, IConfiguration configuration)
        {
            _repository = repository;
            _jwtService = jwtService;
            _configuration = configuration;
        }

        [HttpPost(template: "register")]
        public IActionResult Register(RegisterDTO dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            return Created("success", _repository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _repository.GetByEmail(dto.Email);

            if (user == null) return BadRequest(new { message = "Invalid credentials" });

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.Password))
            {
                return BadRequest(new { message = "Invalid credentials" });
            }

            var jwt = _jwtService.Generate(user.Id, _repository);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly= true,
                IsEssential = true
            });

            return Ok(new UserDTO
            {
                Name = user.Name,
                Role = user.Role
            });
        }

        [HttpGet(template: "user")]
        public IActionResult User()
        {
            try
            {
                var jwt = Request.Cookies[_configuration["Jwt:Cookie"]];

                var token = _jwtService.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = _repository.GetById(userId);


                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost(template: "logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "success"
            });
        }

        [Authorize(Policy = Policies.Admin)]
        [HttpGet(template: "test")]
        public IActionResult Test()
        {
            return Ok(new
            {
                message = "success"
            });
        }
    }
}
