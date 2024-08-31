using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PassportApplicationWebApi.DTOs.Complaint;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;

namespace PassportApplicationWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ComplaintsController : ControllerBase
    {
        private readonly IRepository<Complaint> _repo;
        private readonly IMapper _mapper;
        public ComplaintsController(IRepository<Complaint> repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllComplaints()
        {
            var complaints = await _repo.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<ComplaintDto>>(complaints));
        }

        [HttpPost]
        public async Task<IActionResult> CreateComplaint(CreateComplaintDto complaintDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            

            var complaint = _mapper.Map<Complaint>(complaintDto);
            var result = await _repo.AddAsync(complaint);
            return Ok(_mapper.Map<ComplaintDto>(result));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetComplaintById(int id)
        {
            var complaint = await _repo.GetByIdAsync(id);
            if (complaint == null)
            {
                return NotFound("Complaint not found");
            }

            return Ok(_mapper.Map<ComplaintDto>(complaint));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComplaint(int id, UpdateComplaintDto complaintDto)
        {
            var existingComplaint  = await _repo.GetByIdAsync(id);
            if (existingComplaint == null)
            {
                return NotFound("Complaint not found");
            }
            existingComplaint.ComplaintStatus = complaintDto.ComplaintStatus;
            var result = await _repo.UpdateAsync(existingComplaint);
            return Ok(_mapper.Map<ComplaintDto>(result));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComplaint(int id)
        {
            var complaint = await _repo.GetByIdAsync(id);
            if (complaint == null)
            {
                return NotFound("Complaint not found");
            }
            await _repo.DeleteAsync(complaint);
            return NoContent();
        }
    }
}
