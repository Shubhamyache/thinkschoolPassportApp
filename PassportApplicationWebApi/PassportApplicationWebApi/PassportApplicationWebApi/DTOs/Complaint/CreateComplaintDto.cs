using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Complaint
{
    public class CreateComplaintDto
    {
        
        [Required]
        [RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string PassportNumber { get; set; } = string.Empty;
        [Required]
        public string UserId { get; set; }
        
        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string ComplaintType { get; set; } = string.Empty;
        [Required]
        [StringLength(500)]
        public string ComplaintDetails { get; set; } = string.Empty;
        [Required]
        [Range(0, 1)]
        public ComplaintStatus ComplaintStatus { get; set; }
    }
}
