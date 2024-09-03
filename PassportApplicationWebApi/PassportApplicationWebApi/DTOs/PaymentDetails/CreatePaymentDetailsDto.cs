﻿using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.PaymentDetails
{
    public class CreatePaymentDetailsDto
    { 
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        //[RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string ApplicationNumber { get; set; } = string.Empty;

        [Required]
        [Range(0, 10000)]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        [StringLength(20)]
        public string PaymentMethod { get; set; } = string.Empty;

        [Required]
        [StringLength(256)]
        public string PaymentDetail { get; set; } = string.Empty;

        //[Required]
        //public ApplicationType ApplicationType { get; set; }
    }
}
