using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Complaint
{
    public class ComplaintDto
    {
       
        public int Id { get; set; }
       
        public string PassportNumberOrApplicationNumber { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
      
        public string MobileNumber { get; set; } = string.Empty;

        public string ComplaintType { get; set; } = string.Empty;
     
        public string ComplaintDetails { get; set; } = string.Empty;
       
        public ComplaintStatus ComplaintStatus { get; set; }
    }
}
