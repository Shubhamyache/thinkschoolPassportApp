using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.DTOs.ApplicationForm;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NewApplicationController : ControllerBase
    {

        private readonly IMapper _mapper;
        private readonly PassportContext _context;
        private readonly IUnitOfWork _unitOfWork;


        public NewApplicationController(PassportContext context, IMapper mapper, IUnitOfWork unitOfWork)

        {
            _context = context;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllApplications()
        {
            return Ok(await _unitOfWork._repositoryPassportApplication.GetAllAsync());

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

            return Ok(passportApplication);
        }

    }
}
