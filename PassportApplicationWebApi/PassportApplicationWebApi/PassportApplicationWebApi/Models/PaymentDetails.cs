using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;

namespace PassportApplicationWebApi.Models
{
    public class PaymentDetails
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public Guid TransactionNumber { get; set; }

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

        [Required]
        [RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string ApplicationNumber { get; set; } = string.Empty;

        public int ApplicationId { get; set; }
        public PassportApplication? PassportApplication { get; set; }

        [Required]
        public ApplicationType ApplicationType { get; set; }

        [Required]
        public PaymentStatus PaymentStatus { get; set; }

        public string UserId { get; set; } = string.Empty;

        [ForeignKey("UserId")]
        public User? User { get; set; }

    }


    public enum PaymentStatus
    {
        Pending,
        Completed,
        Failed
    }

    public enum ApplicationType
    {
        New,
        Renew
    }

}
