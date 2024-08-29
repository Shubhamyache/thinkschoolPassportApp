using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Models
{
    public class RenewalPassportApplication
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string? ApplicationNumber { get; set; }

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

        [Required]
        public int PreviousPassportDetailsId { get; set; }

        [ForeignKey("PreviousPassportDetailsId")]
        public Passport? PreviousPassportDetails { get; set; }

        [Required]
        public int DocumentsId { get; set; }

        [ForeignKey("DocumentsId")]
        public Documents? Documents { get; set; }

        public User User { get; set; }
    }
}
