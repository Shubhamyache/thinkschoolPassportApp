

using PassportApplicationWebApi.DTOs.AddressDetails;
using PassportApplicationWebApi.DTOs.ApplicantDetails;
using PassportApplicationWebApi.DTOs.EmergencyContactDetails;
using PassportApplicationWebApi.DTOs.FamilyDetails;
using PassportApplicationWebApi.DTOs.Passport;
using PassportApplicationWebApi.DTOs.User;

namespace PassportApplicationWebApi.DTOs.ApplicationForm
{
    public class NewPassportApplicationDto
    {

        public UserDetails UserDetails { get; set; }
        public CreateApplicantDetailsDto ApplicantDetails { get; set; }
        public CreateAddressDetailsDto AddressDetails { get; set; }
        public CreateFamilyDetailsDto FamilyDetails { get; set; }
        public CreateEmergencyContactDetailsDto EmergencyContactDetails  { get; set; }
        //public CreatePassportDto PreviousPassportDetails { get; set; }

    }
}
