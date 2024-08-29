using Microsoft.AspNetCore.Identity;

namespace PassportApplicationWebApi.Models
{
    public class ApplicationUser: IdentityUser
    {  
        //navigation property to User
        public User? User { get; set; }
    }
}
