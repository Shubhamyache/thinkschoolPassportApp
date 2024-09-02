using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PassportApplicationWebApi.Models
{
    public class Complaint
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [RegularExpression(@"^\d{8}$", ErrorMessage = "{0} should have length 8")]
        public string PassportNumberOrApplicationNumber { get; set; } = string.Empty;
        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string FullName { get; set; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        [Phone(ErrorMessage = "Invalid Phone Number")]
        [StringLength(15, MinimumLength = 10)]
        public string MobileNumber { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        [ForeignKey("UserId")]
        public User? User { get; set; }
        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string ComplaintType { get; set; } = string.Empty;
        [Required]
        [StringLength(500)]
        public string ComplaintDetails { get; set; } = string.Empty;
        [Required]
        [Range(0,1)]
        public ComplaintStatus ComplaintStatus { get; set; }
    }

    public enum ComplaintStatus
    {
        Pending,
        Resolved
    }
}
