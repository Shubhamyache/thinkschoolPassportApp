using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PassportApplicationWebApi.Models
{
    public class User
    {
        [Key]
        public string UserId { get; set; } = string.Empty;

        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string FirstName { get; set; }  = string.Empty;

        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone(ErrorMessage = "Invalid Phone Number")]
        public string PhoneNumber { get; set; } = string.Empty;
        public int? ApplicationNumber { get; set; }
 
        [RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string? PassportNumber { get; set; }

        public int? PassportId { get; set; }

        [ForeignKey("PassportId")]
        public Passport? Passport { get; set; }
        public ICollection<PassportApplication> PassportApplications { get; set; } = new List<PassportApplication>();
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
        public ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();
        public ICollection<PaymentDetails> PaymentDetails { get; set; } = new List<PaymentDetails>();
        public ApplicationUser? AppUser { get; set; }
    }
}
