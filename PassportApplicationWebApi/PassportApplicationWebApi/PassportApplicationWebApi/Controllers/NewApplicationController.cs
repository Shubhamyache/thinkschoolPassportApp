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
        private readonly IRepository<PassportApplication> _passportAppRepo;


        public NewApplicationController(PassportContext context, IMapper mapper, IUnitOfWork unitOfWork, IApplicationsRepository applicationsRepository, IRepository<Passport> passportRepository, IRepository<User> userRepository, IRepository<PassportApplication> passportAppRepo)

        {
            _context = context;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _applicationsRepository = applicationsRepository;
            _passportRepository = passportRepository;
            _userRepository = userRepository;
            _passportAppRepo = passportAppRepo;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllApplications()
        {
            var applications = await _applicationsRepository.GetAllApplicationsAsync();

            if (applications == null)
            {
                return NotFound("No applications found");
            }

            //var applicationsDto = applications.Where(a=> a.IsRenewalApplication == false).Select(a => _mapper.Map<GetPassportApplicationDto>(a)).ToList();
            var applicationsDto = applications.Where(a => a.IsRenewalApplication == false).Select(a => new GetNewPassportApplicationDto
            {
                ApplicationNumber = a.ApplicationNumber,
                GivenName = a.ApplicantDetails.GivenName,
                Surname = a.ApplicantDetails.Surname,
                DOB = a.ApplicantDetails.DOB,
                District = a.ApplicantDetails.District,
                RegionCountry = a.ApplicantDetails.RegionCountry,
                Aadhar = a.ApplicantDetails.Aadhaar,
                ApplicationStatus = a.ApplicationStatus
            }).ToList();

            return Ok(applicationsDto);
        }

        [HttpGet("getAllRenewApplications")]
        public async Task<IActionResult> GetAllRenewApplications()
        {
            var applications = await _applicationsRepository.GetAllApplicationsAsync();

            if (applications == null)
            {
                return NotFound("No applications found");
            }

            //var applicationsDto = applications.Where(a=> a.IsRenewalApplication == false).Select(a => _mapper.Map<GetPassportApplicationDto>(a)).ToList();
            var applicationsDto = applications.Where(a => a.IsRenewalApplication == true).Select(a => new GetRenewPassportApplicationDto
            {
                ApplicationNumber = a.ApplicationNumber,
                PassportNumber = a.PassportNumber,
                ReIssueReason  = a.ReIssueReason,
                GivenName = a.ApplicantDetails.GivenName,
                Surname = a.ApplicantDetails.Surname,
                DOB = a.ApplicantDetails.DOB,
                District = a.ApplicantDetails.District,
                RegionCountry = a.ApplicantDetails.RegionCountry,
                Aadhar = a.ApplicantDetails.Aadhaar,
                ApplicationStatus = a.ApplicationStatus
            }).ToList();

            return Ok(applicationsDto);
        }


        [HttpPut("{ApplicationNumber}")]
        public async Task<IActionResult> UpdateApplication(string ApplicationNumber, [FromQuery] ApplicationStatus updatedApplicationStatus, [FromBody] string? rejectedMessage)
        {
            var application = await _applicationsRepository.GetApplicationByApplicationNumberAsync(ApplicationNumber);
            var applicationDto = _mapper.Map<GetPassportApplicationDto>(application);

            if (application == null)
            {
                return NotFound("Application not found");
            }

            if (applicationDto.ApplicationStatus == ApplicationStatus.Completed)
            {
                return BadRequest("Application already Processed");
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
            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Check if the user exists in the database
                var userEmail = newPassportForm.UserDetails.Email;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    return BadRequest(new { message = "User not found." });
                }

                // Map DTOs to actual entities
                var applicantDetails = _mapper.Map<ApplicantDetails>(newPassportForm.ApplicantDetails);
                var addressDetails = _mapper.Map<AddressDetails>(newPassportForm.AddressDetails);
                var familyDetails = _mapper.Map<FamilyDetails>(newPassportForm.FamilyDetails);
                var emergencyContactDetails = _mapper.Map<EmergencyContactDetails>(newPassportForm.EmergencyContactDetails);
                //var passport = _mapper.Map<Passport>(newPassportForm.PreviousPassportDetails);

                // Validate necessary fields
                if (applicantDetails == null || addressDetails == null || familyDetails == null || emergencyContactDetails == null)
                {
                    return BadRequest(new { message = "One or more required details are missing or invalid." });
                }

                // Create a new PassportApplication instance
                var passportApplication = new PassportApplication
                {
                    ApplicantDetails = applicantDetails,
                    AddressDetails = addressDetails,
                    FamilyDetails = familyDetails,
                    EmergencyContactDetails = emergencyContactDetails,
                    //PreviousPassportDetails = passport,
                    UserId = user.UserId,
                    ApplicationStatus = ApplicationStatus.New,
                    IsRenewalApplication = false,
                    ApplicationNumber = newPassportForm.UserDetails.ApplicationId.ToString()
                };

                // Add the whole passport application at once
                await _unitOfWork._repositoryPassportApplication.AddAsync(passportApplication);

                user.ApplicationNumber = newPassportForm.UserDetails.ApplicationId;
                await _unitOfWork._repositoryUser.UpdateAsync(user);

                // Save all changes to the database in one transaction
                await _unitOfWork.SaveChangesAsync();

                return Ok(new { success = true, message = "Application Submit Success" });

            }
            catch (Exception ex)
            {
                // Log the error (optional) and return a meaningful error message
                return StatusCode(500, new { message = "An error occurred while submitting the application.", error = ex.Message });
            }
        }


        //Renew passport application endpoint 
        [HttpPost("ReNewPassportApplication")]
        public async Task<ActionResult> ReNewApplication(RenewPassportApplicationDto reNewPassportFormDto)
        {
            // Check if the model state is valid
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Check if the user exists in the database
                var userEmail = reNewPassportFormDto.RenewUserDetails.Email;
                var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userEmail);

                if (user == null)
                {
                    return BadRequest(new { message = "User not found." });
                }

                // Map DTOs to actual entities
                var applicantDetails = _mapper.Map<ApplicantDetails>(reNewPassportFormDto.ApplicantDetails);
                var addressDetails = _mapper.Map<AddressDetails>(reNewPassportFormDto.AddressDetails);
                var familyDetails = _mapper.Map<FamilyDetails>(reNewPassportFormDto.FamilyDetails);
                var emergencyContactDetails = _mapper.Map<EmergencyContactDetails>(reNewPassportFormDto.EmergencyContactDetails);
                var passport = _mapper.Map<Passport>(reNewPassportFormDto.PreviousPassportDetails);

                // Validate necessary fields
                if (applicantDetails == null || addressDetails == null || familyDetails == null || emergencyContactDetails == null)
                {
                    return BadRequest(new { message = "One or more required details are missing or invalid." });
                }

                // Create a new PassportApplication instance
                var passportApplication = new PassportApplication
                {
                    ApplicantDetails = applicantDetails,
                    PassportNumber = reNewPassportFormDto.PreviousPassportDetails.PassportNumber,
                    AddressDetails = addressDetails,
                    FamilyDetails = familyDetails,
                    EmergencyContactDetails = emergencyContactDetails,
                    PreviousPassportDetails = passport,
                    UserId = user.UserId,
                    ApplicationStatus = ApplicationStatus.New,
                    IsRenewalApplication = true,
                    ApplicationNumber = reNewPassportFormDto.RenewUserDetails.ApplicationId.ToString(),
                    ReIssueReason = reNewPassportFormDto.RenewUserDetails.RenewalReason,

                };

                // Add the whole passport application at once
                await _unitOfWork._repositoryPassportApplication.AddAsync(passportApplication);
                user.ApplicationNumber = reNewPassportFormDto.RenewUserDetails.ApplicationId.ToString();
                await _unitOfWork._repositoryUser.UpdateAsync(user);

                // Save all changes to the database in one transaction
                await _unitOfWork.SaveChangesAsync();

                return Ok(new { success = true, message = "Application Submit Success" });

            }
            catch (Exception ex)
            {
                // Log the error (optional) and return a meaningful error message
                return StatusCode(500, new { message = "An error occurred while submitting the application.", error = ex.Message });
            }
        }

        [HttpDelete("{applicationNumber}")]
        public async Task<IActionResult> DeleteApplication(string applicationNumber)
        {
            var application = await _applicationsRepository.GetApplicationByApplicationNumberAsync(applicationNumber);
            if (application == null)
            {
                return BadRequest("Application not found");
            }
            await _passportAppRepo.DeleteAsync(application);

            return NoContent();
        }

        [HttpGet("GetApplicationStatus")]
        public async Task<ActionResult> GetApplicationStatus(string applicationNumber)
        {
            // Check if the application exists
            var tempPassportApplication = await _context.PassportApplications
                .FirstOrDefaultAsync(p => p.ApplicationNumber == applicationNumber);

            if (tempPassportApplication == null)
            {
                return NotFound(new { Message = "Application not found." });
            }

            // Retrieve full application details using repository pattern
            var passportApplication = await _unitOfWork._repositoryPassportApplication
                .GetByIdAsync(tempPassportApplication.Id);

            if (passportApplication == null)
            {
                return NotFound(new { Message = "Application details not found." });
            }

            // Return only the relevant data (DTO)
            var applicationStatusDto = new
            {
                ApplicationNumber = passportApplication.ApplicationNumber,
                Status = passportApplication.ApplicationStatus,  // Assuming status is an integer enum
                RejectedMessage = passportApplication.RejectedMessage
            };

            return Ok(applicationStatusDto);
        }

    }
}
