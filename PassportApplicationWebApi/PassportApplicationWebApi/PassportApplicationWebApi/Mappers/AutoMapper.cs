using AutoMapper;
using PassportApplicationWebApi.DTOs.AddressDetails;
using PassportApplicationWebApi.DTOs.ApplicantDetails;
using PassportApplicationWebApi.DTOs.ApplicationForm;
using PassportApplicationWebApi.DTOs.Complaint;
using PassportApplicationWebApi.DTOs.Documents;
using PassportApplicationWebApi.DTOs.EmergencyContactDetails;
using PassportApplicationWebApi.DTOs.FamilyDetails;
using PassportApplicationWebApi.DTOs.Feedback;
using PassportApplicationWebApi.DTOs.Passport;
using PassportApplicationWebApi.DTOs.PassportApplication;
using PassportApplicationWebApi.DTOs.PaymentDetails;
using PassportApplicationWebApi.DTOs.User;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Mappers
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<ApplicantDetails, ApplicantDetailsDto>().ReverseMap();
            CreateMap<ApplicantDetails, CreateApplicantDetailsDto>().ReverseMap();
            CreateMap<AddressDetails, AddressDetailsDto>().ReverseMap();
            CreateMap<AddressDetails, CreateAddressDetailsDto>().ReverseMap();
            CreateMap<FamilyDetails, FamilyDetailsDto>().ReverseMap();
            CreateMap<FamilyDetails, CreateFamilyDetailsDto>().ReverseMap();
            CreateMap<Documents, DocumentsDto>().ReverseMap();
            CreateMap<Documents, CreateDocumentsDto>().ReverseMap();
            CreateMap<EmergencyContactDetails, EmergencyContactDetailsDto>().ReverseMap();
            CreateMap<EmergencyContactDetails, CreateEmergencyContactDetailsDto>().ReverseMap();
            CreateMap<Passport, PassportDto>().ReverseMap();
            CreateMap<Passport, CreatePassportDto>().ReverseMap();
            CreateMap<Complaint, ComplaintDto>().ReverseMap();
            CreateMap<Complaint, CreateComplaintDto>().ReverseMap();
            CreateMap<Feedback, FeedbackDto>().ReverseMap();
            CreateMap<Feedback, CreateFeedbackDto>().ReverseMap();
            CreateMap<PassportApplication, PassportApplicationDto>().ReverseMap();
            CreateMap<PassportApplication, CreatePassportApplicationDto>().ReverseMap();
            CreateMap<PaymentDetails, PaymentDetailsDto>().ReverseMap();
            CreateMap<PaymentDetails, CreatePaymentDetailsDto>().ReverseMap();
            CreateMap<PassportApplication, GetPassportApplicationDto>()
           .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.User.Email))
           .ForMember(dest => dest.ApplicationNumber, opt => opt.MapFrom(src => src.ApplicationNumber))
           .ForMember(dest => dest.ApplicantDetails, opt => opt.MapFrom(src => src.ApplicantDetails))
           .ForMember(dest => dest.AddressDetails, opt => opt.MapFrom(src => src.AddressDetails))
           .ForMember(dest => dest.EmergencyContactDetails, opt => opt.MapFrom(src => src.EmergencyContactDetails))
           .ForMember(dest => dest.Documents, opt => opt.MapFrom(src => src.Documents))
           .ForMember(dest => dest.PaymentDetails, opt => opt.MapFrom(src => src.PaymentDetails))
           .ForMember(dest => dest.ApplicationStatus, opt => opt.MapFrom(src => src.ApplicationStatus));
        }
    }
}
