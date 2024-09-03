using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PassportApplicationWebApi.Data;
using PassportApplicationWebApi.DTOs.Complaint;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;
using PassportApplicationWebApi.Repositories;

//Complaint Controller
namespace PassportApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private readonly IRepository<Complaint> _repository;
        private readonly IMapper _mapper;
        private readonly PassportContext _context;
        public ComplaintsController(IRepository<Complaint> repository, IMapper mapper, PassportContext context)
        {
            _repository = repository;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ComplaintDto>>> GetComplaints()
        {
            var complaints = await _repository.GetAllAsync();
            var complaintsDto = _mapper.Map<IEnumerable<ComplaintDto>>(complaints);
            return Ok(complaintsDto);
        }

        [HttpPost]
        public async Task<ActionResult<ComplaintDto>> PostComplaint(CreateComplaintDto createComplaintDto)
        {
            // Get the UserId based on the email from the DTO
            var User = await _context.Users.FirstOrDefaultAsync(u=>u.Email==createComplaintDto.Email);

            if (User == null)
            {
                return NotFound($"User with email {createComplaintDto.Email} not found.");
            }

            // Map DTO to entity
            var complaint = _mapper.Map<Complaint>(createComplaintDto);
            complaint.ComplaintStatus = ComplaintStatus.Pending; // Set status to Pending
            complaint.UserId = User.UserId; // Set the UserId of the current user

            // Add the complaint to the repository
            var addedComplaint = await _repository.AddAsync(complaint);
            var complaintDto = _mapper.Map<ComplaintDto>(addedComplaint);

            return CreatedAtAction(nameof(GetComplaint), new { id = complaintDto.Id }, complaintDto);
        }


        // GET: api/complaint/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ComplaintDto>> GetComplaint(int id)
        {
            var complaint = await _repository.GetByIdAsync(id);

            if (complaint == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<ComplaintDto>(complaint));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutComplaint(int id, ComplaintStatus complaintStatus)
        {
            var existingComplaint = await _repository.GetByIdAsync(id);
            if (existingComplaint == null)
            {
                return NotFound("Complaint not found");
            }
            existingComplaint.ComplaintStatus = complaintStatus;
            var updatedComplaint = await _repository.UpdateAsync(existingComplaint);
            return Ok(_mapper.Map<ComplaintDto>(updatedComplaint));
        }


        // DELETE: api/complaint/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComplaint(int id)
        {
            var complaint = await _repository.GetByIdAsync(id);

            if (complaint == null)
            {
                return NotFound();
            }

            await _repository.DeleteAsync(complaint.Id);

            return NoContent();
        }
    }
}
