using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PassportApplicationWebApi.Models
{
    public class User
    {
        [Key]
        public string UserId { get; set; } 

        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string FirstName { get; set; }  = string.Empty;

        [Required]
        [StringLength(55, MinimumLength = 2)]
        public string LastName { get; set; } = string.Empty;

        [Required]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; } = string.Empty;

        [Required]
        [Phone(ErrorMessage = "Invalid Phone Number")]
        public string PhoneNumber { get; set; } = string.Empty;

        public int? ApplicationId { get; set; }
        public ApplicationStatus? ApplicationStatus { get; set; }


        public int? RenewalApplicationId { get; set; }
        public ApplicationStatus? RenewalApplicationStatus { get; set; }

        [RegularExpression(@"^[A-Z]\d{7}$", ErrorMessage = "{0} should have length 8")]
        public string? PassportNumber { get; set; }

        public int? PassportId { get; set; }

        [ForeignKey("PassportId")]
        public Passport? Passport { get; set; }
        public PassportStatus? PassportStatus { get; set; }

        public int NewPassportApplicationId { get; set; }
        public NewPassportApplication? NewPassportApplication { get; set; }
        public int NewRenewalApplicationId { get; set; }
        public RenewalPassportApplication? NewRenewalApplication { get; set; }
        public ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();
        public ICollection<Complaint> Complaints { get; set; } = new List<Complaint>();

        //navigation property to ApplicationUser
        public ApplicationUser? AppUser { get; set; }
    }

    //Enumerations
    public enum ApplicationStatus
    {
        New,
        Applied,
        UnderProcess,
        Completed, 
        Rejected
    }

    public enum PassportStatus
    {
       Active, 
       Expired,
       Blocked
    }
}
