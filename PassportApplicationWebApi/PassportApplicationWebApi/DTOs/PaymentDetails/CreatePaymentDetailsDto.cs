using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.PaymentDetails
{
    public class CreatePaymentDetailsDto
    {

        

        [Required]
        [StringLength(50)]
        public Guid TransactionNumber { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PaymentDate { get; set; }

        [Required]
        [StringLength(20)]
        public string PaymentMethod { get; set; } = string.Empty;

        [Required]
        [StringLength(256)]
        public string PaymentDetail { get; set; } = string.Empty;



        [Required]
        public int ApplicationId { get; set; }

        [Required]
        [StringLength(20)]
        public ApplicationType ApplicationType { get; set; }// Discriminator column for application type

        [Required]
        public PaymentStatus PaymentStatus { get; set; }

        [Required]
        public string UserId { get; set; }
    }
}
