using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.User
{
    public class UserDetails
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public int ApplicationId { get; set; }
    }
}