using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Feedback
{
    public class CreateFeedbackDto
    {
        
        [Required]
        [RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string PassportNumber { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; } = string.Empty;
        

        [Range(1, 5)]
        public int Rating { get; set; }
        [Required]
        [StringLength(500)]
        public string FeedbackDetails { get; set; } = string.Empty;
    }
}
}
