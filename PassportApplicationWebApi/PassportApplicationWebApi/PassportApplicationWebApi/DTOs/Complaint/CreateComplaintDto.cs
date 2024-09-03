using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Complaint
{
    public class CreateComplaintDto
    {
        [Required]
        //[RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
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
        [StringLength(55, MinimumLength = 2)]
        public string ComplaintType { get; set; } = string.Empty;

        [Required]
        [StringLength(500)]
        public string ComplaintDetails { get; set; } = string.Empty;

    }
}
