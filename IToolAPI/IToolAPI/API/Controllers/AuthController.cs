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
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace IToolAPI.Controllers
{
    [ApiController]
    [Route(template: "api")]
    public class AuthController : Controller
    {
        private readonly IUserRepository _repository;
        private readonly JwtService _jwtService;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext context;

        public AuthController(ApplicationDbContext context, IUserRepository repository, JwtService jwtService, IConfiguration configuration)
        {
            _repository = repository;
            _jwtService = jwtService;
            this.context = context;
            _configuration = configuration;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost(template: "register")]
        public IActionResult Register(RegisterDTO dto)
        {
            var user = new User
            {
                Name = dto.Name,
                Username = dto.Username,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };

            return Created("success", _repository.Create(user));
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDTO dto)
        {
            var user = _repository.GetByUsername(dto.Username);

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

        [Authorize(Roles = "Admin")]
        [HttpGet("user/getall")]
        public async Task<ActionResult<List<UserGetAllResponse>>> Get()
        {
            var users = await context.Users
                .Where(x => x.Role != "Admin")
                .Select(x => new UserGetAllResponse()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Role = x.Role,
                    Username = x.Username
                }
                )
                .ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("user/{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var user = await context.Users.Where(x => x.Id == id)
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("user/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var user = await context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user == null)
            {
                return NotFound();
            }

            context.Remove(user);
            await context.SaveChangesAsync();
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("user")]
        public async Task<ActionResult<int>> Put(User user)
        {
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
            context.Update(user);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
