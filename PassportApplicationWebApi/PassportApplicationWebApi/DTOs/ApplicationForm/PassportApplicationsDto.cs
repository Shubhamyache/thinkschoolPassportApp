using PassportApplicationWebApi.DTOs.AddressDetails;
using PassportApplicationWebApi.DTOs.ApplicantDetails;
using PassportApplicationWebApi.DTOs.EmergencyContactDetails;
using PassportApplicationWebApi.DTOs.FamilyDetails;
using PassportApplicationWebApi.DTOs.Passport;
using PassportApplicationWebApi.DTOs.User;

namespace PassportApplicationWebApi.DTOs.ApplicationForm
{
    public class PassportApplicationsDto
    {
        public UserDetails UserDetails { get; set; }
        public ApplicantDetailsDto ApplicantDetails { get; set; }
        public AddressDetailsDto AddressDetails { get; set; }
        public FamilyDetailsDto FamilyDetails { get; set; }
        public EmergencyContactDetailsDto EmergencyContactDetails { get; set; }
        public PassportDto PreviousPassportDetails { get; set; }
    }
}
