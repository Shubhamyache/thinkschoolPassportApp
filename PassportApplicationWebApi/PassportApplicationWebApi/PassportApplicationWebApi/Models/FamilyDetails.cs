using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Models
{
    public class FamilyDetails
    {
        [Key]
        public int Id { get; set; }

        [StringLength(50)]
        public string FatherGivenName { get; set; } = string.Empty;

        [StringLength(50)]
        public string FatherSurname { get; set; } = string.Empty;

        [StringLength(50)]
        public string MotherGivenName { get; set; } = string.Empty;

        [StringLength(50)]
        public string MotherSurname { get; set; } = string.Empty;

        [StringLength(50)]
        public string LegalGuardianGivenName { get; set; } = string.Empty;

        [StringLength(50)]
        public string LegalGuardianSurname { get; set; } = string.Empty;

        [StringLength(50)]
        public string SpouseGivenName { get; set; } = string.Empty;

        [StringLength(50)]
        public string SpouseSurname { get; set; } = string.Empty;

        public bool ApplicantMinor { get; set; }

        [StringLength(9)]
        public string FatherPassportNumber { get; set; } =  string.Empty;

        [StringLength(50)]
        public string FatherNationality { get; set; } = string.Empty;

        [StringLength(9)]
        public string MotherPassportNumber { get; set; } = string.Empty;

        [StringLength(50)]
        public string MotherNationality { get; set; } = string.Empty;

    }
}
