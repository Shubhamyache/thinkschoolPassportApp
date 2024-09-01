using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.DTOs.ApplicantDetails;
using PassportApplicationWebApi.DTOs.ApplicationForm;
using PassportApplicationWebApi.DTOs.Passport;
using PassportApplicationWebApi.DTOs.PassportApplication;
using PassportApplicationWebApi.HelperClass;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewApplicationController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly PassportContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IApplicationsRepository _applicationsRepository;
        private readonly IRepository<Passport> _passportRepository;
        private readonly IRepository<User> _userRepository;


        public NewApplicationController(PassportContext context, IMapper mapper, IUnitOfWork unitOfWork, IApplicationsRepository applicationsRepository, IRepository<Passport> passportRepository, IRepository<User> userRepository)

        {
            _context = context;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _applicationsRepository = applicationsRepository;
            _passportRepository = passportRepository;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllApplications()
        {
            var applications = await _applicationsRepository.GetAllApplicationsAsync();

            if (applications == null)
            {
                return NotFound("No applications found");
            }

            var applicationsDto = applications.Select(a => _mapper.Map<GetPassportApplicationDto>(a)).ToList();

            return Ok(applicationsDto);
        }

        [HttpPut("{ApplicationNumber}")]
        public async Task<IActionResult> UpdateApplication(string ApplicationNumber, ApplicationStatus updatedApplicationStatus, [FromBody] string rejectedMessage)
        {
            var application = await _applicationsRepository.GetApplicationByApplicationNumberAsync(ApplicationNumber);
            var applicationDto = _mapper.Map<GetPassportApplicationDto>(application);

            if (application == null)
            {
                return NotFound("Application not found");
            }

            if (application.User.Passport == null)
            {
                return BadRequest("Passport already Available");
            }

            if (updatedApplicationStatus == ApplicationStatus.Completed)
            {
                var newPassport = new Passport
                {
                    PassportNumber = PassportNumberGenerator.GeneratePassportNumber(),
                    FirstName = applicationDto.ApplicantDetails.GivenName,
                    LastName = applicationDto.ApplicantDetails.Surname,
                    Address = applicationDto.AddressDetails.PresentHouseStreet,
                    ExpiryDate = DateTime.Now.AddYears(10),
                    DOB = applicationDto.ApplicantDetails.DOB,
                    Country = applicationDto.ApplicantDetails.RegionCountry,
                    DateOfIssue = DateTime.Now,
                    Gender = applicationDto.ApplicantDetails.Gender,
                    PassportStatus = PassportStatus.Active
                };

                var newCreatedPassport = await _passportRepository.AddAsync(newPassport);
                application.User.PassportNumber = newCreatedPassport.PassportNumber;
                application.User.PassportId = newCreatedPassport.PassportId;
            }

            if (updatedApplicationStatus == ApplicationStatus.Rejected)
            {
                application.RejectedMessage = rejectedMessage;
            }

            application.ApplicationStatus = updatedApplicationStatus;
            var updatedApplication = await _applicationsRepository.UpdateApplicationAsync(application);

            return NoContent();
        }

        [HttpGet("{ApplicationNumber}")]
        public async Task<IActionResult> GetApplicationByApplicationNumber(string ApplicationNumber)
        {
            var application = await _applicationsRepository.GetApplicationByApplicationNumberAsync(ApplicationNumber);

            if (application == null)
            {
                return NotFound("Application not found");
            }
            return Ok(_mapper.Map<GetPassportApplicationDto>(application));
        }



        [HttpPost(Name = "AddNewPassportApplication")]
        public async Task<ActionResult> AddNewApplication(NewPassportApplicationDto newPassportForm)
        {
            // Check if the user exists in the database
            var userEmail = newPassportForm.UserDetails.Email;
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

            if (user == null)
            {
                throw new Exception("User not found.");
            }

            // Map DTOs to actual entities
            var applicantDetails = _mapper.Map<ApplicantDetails>(newPassportForm.ApplicantDetails);
            var addressDetails = _mapper.Map<AddressDetails>(newPassportForm.AddressDetails);
            var familyDetails = _mapper.Map<FamilyDetails>(newPassportForm.FamilyDetails);
            var emergencyContactDetails = _mapper.Map<EmergencyContactDetails>(newPassportForm.EmergencyContactDetails);
            var passport = _mapper.Map<Passport>(newPassportForm.PreviousPassportDetails);

            // Create a new PassportApplication instance
            var passportApplication = new PassportApplication
            {
                ApplicantDetails = applicantDetails,
                AddressDetails = addressDetails,
                FamilyDetails = familyDetails,
                EmergencyContactDetails = emergencyContactDetails,
                PreviousPassportDetails = passport,
                UserId = user.UserId,
                ApplicationStatus = ApplicationStatus.New,
                IsRenewalApplication = false,
                ApplicationNumber = newPassportForm.UserDetails.ApplicationId.ToString()
            };

            // Now add the whole passport application at once
            await _unitOfWork._repositoryPassportApplication.AddAsync(passportApplication);

            // Save all changes to the database in one transaction
            await _unitOfWork.SaveChangesAsync();

            return Ok("Passport application added successfully.");
        }

    }
}
