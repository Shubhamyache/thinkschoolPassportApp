using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Models
{
    public class AddressDetails
    {
        [Key]
        public int Id { get; set; }

        [StringLength(100)]
        public string PresentHouseStreet { get; set; } = string.Empty;

        [StringLength(50)]
        public string PresentTown { get; set; } = string.Empty;

        [StringLength(50)]
        public string PresentDistrict { get; set; } = string.Empty;

        [StringLength(50)]
        public string PresentPoliceStation { get; set; } = string.Empty;

        [StringLength(50)]
        public string PresentState { get; set; } = string.Empty;
        
        public int Pincode { get; set; }

        [StringLength(15)]
        [Phone]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(15)]
        [Phone]
        public string TelephoneNumber { get; set; } = string.Empty;

        [StringLength(256)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public bool SameAddress { get; set; }

        [StringLength(100)]
        public string PermanentHouseStreet { get; set; } = string.Empty;

        [StringLength(50)]
        public string PermanentTown { get; set; } = string.Empty;

        [StringLength(50)]
        public string PermanentDistrict { get; set; } = string.Empty;

        [StringLength(50)]
        public string PermanentPoliceStation { get; set; } = string.Empty;

        [StringLength(50)]
        public string PermanentState { get; set; } = string.Empty;

        [StringLength(6)]
        public string PermanentPin { get; set; } = string.Empty;

        [StringLength(15)]
        [Phone]
        public string PermanentMobileNumber { get; set; } = string.Empty;

        [StringLength(15)]
        [Phone]
        public string PermanentTelephoneNumber { get; set; } = string.Empty;
    }
}
