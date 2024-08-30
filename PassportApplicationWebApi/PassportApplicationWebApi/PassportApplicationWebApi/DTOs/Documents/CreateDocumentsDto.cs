using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Documents
{
    public class CreateDocumentsDto
    {
        

        [Required]
        [StringLength(256)]
        public string IdentityProof { get; set; } = string.Empty;

        [Required]
        [StringLength(256)]
        public string AddressProof { get; set; } = string.Empty;

        [Required]
        [StringLength(256)]
        public string AgeProof { get; set; } = string.Empty;

        [Required]
        [StringLength(256)]
        public string PassportPhoto { get; set; } = string.Empty;
    }
}
