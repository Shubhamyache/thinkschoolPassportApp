using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.DTOs.User;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IRepository<User> _repo;
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        private readonly PassportContext _context;
        public UsersController(IRepository<User> repo, IMapper mapper, IUserRepository userRepo, PassportContext context)
        {
            _repo = repo;
            _mapper = mapper;
            _userRepo = userRepo;
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _repo.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<UserDto>>(users));
        }

        [HttpPut("{email}")]
        public async Task<IActionResult> Update(string email, UserDto userDto)
        {
            var existingUser = await _userRepo.GetByEmailAsync(email);
            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            _context.Entry(existingUser).State = EntityState.Detached; // Detach existing tracked entity

            var user = _mapper.Map<User>(userDto);
            user.UserId = existingUser.UserId; // Ensure the same UserId

            var result = await _repo.UpdateAsync(user);

            return Ok(_mapper.Map<UserDto>(result));
        }

        [HttpGet("{email}")]
        public async Task<IActionResult> GetByEmail(string email)
        {
            var user = await _userRepo.GetByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
           return Ok(_mapper.Map<UserDto>(user));
        }

        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            var user = await _userRepo.GetByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            await _repo.DeleteAsync(user);
            return NoContent();
        }

        [HttpPost("deleteBulk")]
        public async Task<IActionResult> DeleteBulk([FromBody] List<string> emails)
        {
            if (emails == null || emails.Count == 0)
            {
                return BadRequest("No student IDs provided for deletion.");
            }

            try
            {
                foreach (var email in emails)
                {
                    var user = await _userRepo.GetByEmailAsync(email);
                    if (user != null)
                    {
                        await _repo.DeleteAsync(user);
                    }
                }

                return Ok("Selected students deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
