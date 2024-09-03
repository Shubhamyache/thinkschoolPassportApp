using PassportApplicationWebApi.DTOs.AddressDetails;
using PassportApplicationWebApi.DTOs.ApplicantDetails;
using PassportApplicationWebApi.DTOs.Documents;
using PassportApplicationWebApi.DTOs.EmergencyContactDetails;
using PassportApplicationWebApi.DTOs.FamilyDetails;
using PassportApplicationWebApi.DTOs.Passport;
using PassportApplicationWebApi.DTOs.PaymentDetails;
using PassportApplicationWebApi.DTOs.User;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.DTOs.ApplicationForm
{
    public class GetPassportApplicationDto
    {
        public string ApplicationNumber { get; set; }
        public string Email { get; set; }
        public UserDto UserDto { get; set; }
        public ApplicantDetailsDto ApplicantDetails { get; set; }
        public FamilyDetailsDto FamilyDetails { get; set; }
        public AddressDetailsDto AddressDetails { get; set; }
        public EmergencyContactDetailsDto EmergencyContactDetails { get; set; }
        public PassportDto Passport { get; set; }
        public DocumentsDto Documents { get; set; }
        public PaymentDetailsDto PaymentDetails { get; set; }

        public ApplicationStatus ApplicationStatus { get; set; }
    }
}
