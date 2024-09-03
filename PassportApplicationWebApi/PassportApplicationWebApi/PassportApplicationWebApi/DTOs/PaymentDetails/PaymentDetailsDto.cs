using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.PaymentDetails
{
    public class PaymentDetailsDto
    {
        public int Id { get; set; }
        public string Email { get; set; }  = string.Empty;
        public Guid TransactionNumber { get; set; }
        public decimal Amount { get; set; }
        public string ApplicationNumber { get; set; } = string.Empty;
        public DateTime PaymentDate { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string PaymentDetail { get; set; } = string.Empty;
        public ApplicationType ApplicationType { get; set; }// Discriminator column for application type
        public PaymentStatus PaymentStatus { get; set; }
    }
}
