using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.AddressDetails
{
    public class AddressDetailsDto
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

        [StringLength(6)]
        public string Pincode { get; set; } = string.Empty;


        [StringLength(10)]
        public string MobileNumber { get; set; } = string.Empty;

        [StringLength(10)]
        public string TelephoneNumber { get; set; } = string.Empty;

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


        [StringLength(10)]
        public string PermanentMobileNumber { get; set; } = string.Empty;

       
        [StringLength(10)]
        public string PermanentTelephoneNumber { get; set; } = string.Empty;
    }
}
