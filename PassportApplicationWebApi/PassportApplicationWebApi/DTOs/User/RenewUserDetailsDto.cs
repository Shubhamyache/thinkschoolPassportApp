using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.User
{
    public class RenewUserDetailsDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string ApplicationId { get; set; }

        [Required]
        public string RenewalReason { get; set; }
    }
}
