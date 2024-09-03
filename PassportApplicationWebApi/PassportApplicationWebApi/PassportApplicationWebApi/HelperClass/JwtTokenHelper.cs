using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PassportApplicationWebApi.HelperClass
{
    public class JwtTokenHelper
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly PassportContext _context;

        public JwtTokenHelper(IConfiguration configuration, UserManager<ApplicationUser> userManager, PassportContext context)
        {
            _configuration = configuration;
            _userManager = userManager;
            _context = context;
        }

        public async Task<string> GenerateToken(ApplicationUser appUser)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var roles = await _userManager.GetRolesAsync(appUser);
            var user = await _userManager.FindByEmailAsync(appUser.Email);

            var realUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == appUser.Email);

            

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, appUser.Id),
                new Claim(JwtRegisteredClaimNames.Email, appUser.Email),
                new Claim(ClaimTypes.Role, roles.FirstOrDefault()??""), //Use ClaimTypes.Role
                new Claim("Role", roles.FirstOrDefault()), //Use ClaimTypes.Role
                new Claim("FirstName", realUser.FirstName?? ""),
                new Claim("LastName", realUser.LastName?? ""),
                new Claim("ApplicationNumber", realUser.ApplicationNumber??""),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Aud, jwtSettings["Audience"]),
                new Claim(JwtRegisteredClaimNames.Iss, jwtSettings["Issuer"])
            };

            var tokenOptions = new JwtSecurityToken(
                issuer: jwtSettings["Issuer"],
                audience: jwtSettings["Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(jwtSettings["ExpirationMinutes"])),
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }
}
