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
        public string EmergencyContactMobile { get; set; } = string.Empty;

        public string EmergencyContactTelephone { get; set; } = string.Empty;

        [StringLength(256)]
        [EmailAddress]
        public string EmergencyContactEmail { get; set; } = string.Empty;

    }
}
