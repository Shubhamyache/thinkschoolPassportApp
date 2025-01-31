﻿using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.EmergencyContactDetails
{
    public class CreateEmergencyContactDetailsDto
    {
        

        [Required]
        [StringLength(100)]
        public string EmergencyContactName { get; set; } = string.Empty;

        [Required]
        [StringLength(15)]
        [Phone]
        public string EmergencyContactMobile { get; set; } = string.Empty;

        [StringLength(15)]
        [Phone]
        public string EmergencyContactTelephone { get; set; } = string.Empty;

        [StringLength(256)]
        [EmailAddress]
        public string EmergencyContactEmail { get; set; } = string.Empty;

    }
}
