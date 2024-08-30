using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.PassportApplication
{
    public class PassportApplicationDto
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string ApplicationNumber { get; set; } = string.Empty;

        public string? PassportNumber { get; set; }

        public string? ReIssueReason { get; set; }

        public int? validityInYears { get; set; }


        public string? ChangesInExistingDetails { get; set; }

        [Required]
        public int ApplicantDetailsId { get; set; }



        [Required]
        public int FamilyDetailsId { get; set; }



        [Required]
        public int AddressDetailsId { get; set; }



        [Required]
        public int EmergencyContactDetailsId { get; set; }



        public int? PreviousPassportDetailsId { get; set; }



        [Required]
        public int DocumentsId { get; set; }



        public string UserId { get; set; }

        public int PaymentDetailsId { get; set; }


        public bool IsRenewalApplication { get; set; }

        public string? RejectedMessage { get; set; } = string.Empty;

        public ApplicationStatus ApplicationStatus { get; set; }
    }
}

