using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Models
{
    public class PaymentDetails
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public Guid TransactionNumber { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        [DataType("Decimal(10,2)")]
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
        public ApplicationType ApplicationType { get; set; } // Discriminator column for application type

        [Required]
        public PaymentStatus PaymentStatus { get; set; }

        [Required]
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        public PassportApplication? PassportApplication { get; set; }

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
