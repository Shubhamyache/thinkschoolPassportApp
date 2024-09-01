using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.ApplicantDetails
{
    public class CreateApplicantDetailsDto
    {

        [Required]
        [StringLength(20)]
        public string GivenName { get; set; } = String.Empty;

        [StringLength(20)]
        public string Surname { get; set; } = String.Empty;

        [StringLength(100)]
        public string KnownByOtherNames { get; set; } = String.Empty;

        [StringLength(50)]
        public string Alias { get; set; } = String.Empty;

        [StringLength(50)]
        public string ChangedName { get; set; } = String.Empty;

        [StringLength(50)]
        public string PreviousName { get; set; } = String.Empty;

        [Required]
        public DateTime DOB { get; set; }

        [Required]
        [StringLength(100)]
        public string PlaceOfBirth { get; set; } = String.Empty;

        [Required]
        [StringLength(100)]
        public string District { get; set; } = String.Empty;

        [Required]
        [StringLength(100)]
        public string State { get; set; } = String.Empty;

        [Required]
        [StringLength(100)]
        public string RegionCountry { get; set; } = String.Empty;

        [Required]
        [StringLength(10)]
        public string Gender { get; set; } = String.Empty;

        [Required]
        [StringLength(20)]
        public string MaritalStatus { get; set; } = String.Empty;

        [Required]
        [StringLength(50)]
        public string Citizenship { get; set; } = String.Empty;

        [StringLength(10)]
        public string PanNumber { get; set; } = String.Empty;

        [StringLength(20)]
        public string VoterId { get; set; } = String.Empty;

        [StringLength(50)]
        public string EmploymentType { get; set; } = String.Empty;

        [StringLength(100)]
        public string OrganizationName { get; set; } = String.Empty;

        public bool ParentSpouseGovernmentServant { get; set; }

        [StringLength(50)]
        public string Education { get; set; } = String.Empty;

        public bool NonECR { get; set; }

        [StringLength(100)]
        public string DistinguishingMark { get; set; } = String.Empty;

        [StringLength(12)]
        public string Aadhaar { get; set; } = String.Empty;
    }
}

