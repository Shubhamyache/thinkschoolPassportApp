using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Complaint
{
    public class UpdateComplaintDto
    {
        [Required]
        [Range(0, 1)]
        public ComplaintStatus ComplaintStatus { get; set; }
    }
}
