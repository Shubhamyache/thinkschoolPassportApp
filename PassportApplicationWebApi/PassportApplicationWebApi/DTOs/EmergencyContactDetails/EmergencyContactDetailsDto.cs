using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.EmergencyContactDetails
{
    public class EmergencyContactDetailsDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string EmergencyContactName { get; set; } = string.Empty;

        [Required]
        [StringLength(10, ErrorMessage = "{0} should have 10 digits")]
        [Phone]
        public string EmergencyContactMobile { get; set; } = string.Empty;

        [StringLength(10, ErrorMessage = "{0} should have 10 digits")]
        [Phone]
        public string EmergencyContactTelephone { get; set; } = string.Empty;

        [StringLength(256)]
        [EmailAddress]
        public string EmergencyContactEmail { get; set; } = string.Empty;

    }
}
