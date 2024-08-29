using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PassportApplicationWebApi.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }
        [Required]
        [RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string PassportNumber { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        [ForeignKey("UserId")]
        public User? User { get; set; }
       
        [Range(1,5)]
        public int Rating { get; set; }
        [Required]
        [StringLength(500)]
        public string FeedbackDetails { get; set; } = string.Empty;
    }
}
