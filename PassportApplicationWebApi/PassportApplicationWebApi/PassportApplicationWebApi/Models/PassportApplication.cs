using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Models
{
    public class PassportApplication
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

        [ForeignKey("ApplicantDetailsId")]
        public ApplicantDetails? ApplicantDetails { get; set; }

        [Required]
        public int FamilyDetailsId { get; set; }

        [ForeignKey("FamilyDetailsId")]
        public FamilyDetails? FamilyDetails { get; set; }

        [Required]
        public int AddressDetailsId { get; set; }

        [ForeignKey("AddressDetailsId")]
        public AddressDetails? AddressDetails { get; set; }

        [Required]
        public int EmergencyContactDetailsId { get; set; }

        [ForeignKey("EmergencyContactDetailsId")]
        public EmergencyContactDetails? EmergencyContactDetails { get; set; }
       
        public int? PreviousPassportDetailsId { get; set; }

        [ForeignKey("PreviousPassportDetailsId")]
        public Passport? PreviousPassportDetails { get; set; }

        public int? DocumentsId { get; set; }

        [ForeignKey("DocumentsId")]
        public Documents? Documents { get; set; }

        public string UserId { get; set; }
        public User? User { get; set; }

        public int? PaymentDetailsId { get; set; }
        public PaymentDetails? PaymentDetails { get; set; }

        public bool IsRenewalApplication { get; set; }

        public string? RejectedMessage { get; set; } = string.Empty;

        public ApplicationStatus ApplicationStatus { get; set; }
    }

    public enum ApplicationStatus
    {
        New,
        Applied,
        UnderProcess,
        Completed,
        Rejected
    }
}
