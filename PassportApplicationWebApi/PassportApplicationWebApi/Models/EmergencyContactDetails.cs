﻿using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Models
{
    public class EmergencyContactDetails
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string EmergencyContactName { get; set; } = string.Empty;

        [Required]
        [StringLength(10)]
        public string EmergencyContactMobile { get; set; } = string.Empty;

        [StringLength(10)]
        public string EmergencyContactTelephone { get; set; } = string.Empty;

        [StringLength(256)]
        [EmailAddress]
        public string EmergencyContactEmail { get; set; } = string.Empty;

    }
}
