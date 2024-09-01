using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.EmergencyContactDetails
{
    public class CreateEmergencyContactDetailsDto
    {
        

        [Required]
        [StringLength(100)]
        public string EmergencyContactName { get; set; } = string.Empty;

        [Required]
        [StringLength(10, ErrorMessage ="{0} should have 10 digits")]
        public string EmergencyContactMobile { get; set; } = string.Empty;

   
       
        [StringLength(10, ErrorMessage = "{0} should have 10 digits")]
        public string EmergencyContactTelephone { get; set; } = string.Empty;

        [StringLength(256)]
        [EmailAddress]
        public string EmergencyContactEmail { get; set; } = string.Empty;

    }
}
