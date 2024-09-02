﻿using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.DTOs.PaymentDetails;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;



namespace PassportApplication1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentDetailsController : ControllerBase
    {
        private readonly IRepository<PaymentDetails> _paymentDetailsRepository;
        private readonly IRepository<PassportApplication> _passportApplicationRepository;
        private readonly IRepository<User> _userRepo;
        //private readonly ITransactionNumberGenerator _transactionNumberGenerator;
        private readonly IMapper _mapper;
        private readonly PassportContext _context;

        public PaymentDetailsController(
            IRepository<PaymentDetails> paymentDetailsRepository,
            IRepository<PassportApplication> passportApplicationRepository,
            IRepository<User> userRepo,
            IMapper mapper, PassportContext context)
        {
            _paymentDetailsRepository = paymentDetailsRepository;
            _passportApplicationRepository = passportApplicationRepository;
            _userRepo = userRepo;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePaymentDetails([FromBody] CreatePaymentDetailsDto createPaymentDetailsDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _context.Users.FirstOrDefaultAsync(u=>u.Email == createPaymentDetailsDto.Email);

            if (user == null)
                return NotFound("User not found");

            // Find the application based on ApplicationType and UserId
            var passportApplications = await _passportApplicationRepository.GetAllAsync();
            var passportApplication = passportApplications
                .FirstOrDefault(pa => pa.ApplicationNumber == createPaymentDetailsDto.ApplicationNumber);

            if (passportApplication == null)
                return NotFound("Passport application not found");

            // Map the DTO to the PaymentDetails entity
            var paymentDetails = _mapper.Map<PaymentDetails>(createPaymentDetailsDto);
            paymentDetails.UserId = user.UserId;
            paymentDetails.ApplicationId = passportApplication.Id;
            paymentDetails.PaymentStatus = PaymentStatus.Completed;
            paymentDetails.TransactionNumber = Guid.NewGuid();
            paymentDetails.ApplicationNumber = passportApplication.ApplicationNumber;
            paymentDetails.ApplicationType = passportApplication.IsRenewalApplication ? ApplicationType.Renew : ApplicationType.New;

            // Add the PaymentDetails record to the database
            await _paymentDetailsRepository.AddAsync(paymentDetails);

            return Ok("Payment details created successfully");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPaymentDetails(int id)
        {
            var paymentDetails = await _paymentDetailsRepository.GetByIdAsync(id);
            if (paymentDetails == null)
                return NotFound();

            var paymentDetailsDto = _mapper.Map<PaymentDetailsDto>(paymentDetails);
            return Ok(paymentDetailsDto);
        }

        [HttpGet]
        public async Task<IActionResult> GetPaymentDetails()
        {
            var paymentDetails = await _paymentDetailsRepository.GetAllAsync();
            if(paymentDetails == null)
            {
                return NotFound("No payment details found");
            }
           _mapper.Map<IEnumerable<PaymentDetailsDto>>(paymentDetails);
            return Ok(_mapper.Map<IEnumerable<PaymentDetailsDto>>(paymentDetails));
        }

        
    }

}
