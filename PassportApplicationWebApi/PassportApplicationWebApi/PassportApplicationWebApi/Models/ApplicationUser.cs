using Microsoft.AspNetCore.Identity;

namespace PassportApplicationWebApi.Models
{
    public class ApplicationUser: IdentityUser
    {  
        public User? User { get; set; }
    }
}
