using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.DTOs.AuthDto;
using PassportApplicationWebApi.HelperClass;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly JwtTokenHelper _jwtTokenHelper;
        private readonly PassportContext _passportContext;

        public AuthenticationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, JwtTokenHelper jwtTokenHelper, PassportContext passportContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _jwtTokenHelper = jwtTokenHelper;
            _passportContext = passportContext;
        }

        [HttpGet("checkUserNameExists")]
        public async Task<IActionResult> CheckUserNameExists([FromQuery]string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            if (user != null)
            {
                return Ok(new { Message = "User already exists" });
            }

            return NotFound(new { Message = "User does not exist" });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegistrationDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = new ApplicationUser
            {
                UserName = registerDto.Email,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                // Assign User Role
                await _userManager.AddToRoleAsync(user, "User");

                // Save User additional info
                var userInfo = new User
                {
                    UserId = user.Id,
                    FirstName = registerDto.FirstName,
                    LastName = registerDto.LastName,
                    PhoneNumber = registerDto.PhoneNumber,
                    Email = registerDto.Email,
                    AppUser = user
                };

                //save to database
                _passportContext.Users.Add(userInfo);

                // Add your DbContext to save userInfo to the User table
                await _passportContext.SaveChangesAsync();

                return Ok(new { Message = "User registered successfully" });
            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = await _userManager.FindByEmailAsync(loginDto.Email);

            if (username == null)
            {
                return Unauthorized("User does not exist !");
            }

            var result = await _signInManager.PasswordSignInAsync(username, loginDto.Password, false, lockoutOnFailure:true);

            if (result.Succeeded)
            {
                var token = await _jwtTokenHelper.GenerateToken(username);
                return Ok(new { Token = token });
            }
            else if(result.IsLockedOut)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Account is Locked. Please try again later");
            }
            else {
                return Unauthorized("Invalid login Attempt");
            }
           
        }
    }

}

