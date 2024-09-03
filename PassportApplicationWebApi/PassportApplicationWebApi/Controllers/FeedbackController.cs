using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PassportApplicationWebApi.DTOs.Feedback;
using PassportApplicationWebApi.Interfaces;
using PassportApplicationWebApi.Models;

//Feedback Controller
namespace PassportApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FeedbackController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Feedback> _repository;

        public FeedbackController(IMapper mapper, IRepository<Feedback> repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        // GET: api/feedback
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FeedbackDto>>> GetFeedbacks()
        {
            var feedbacks = await _repository.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<FeedbackDto>>(feedbacks));
        }

        // GET: api/feedback/5
        [HttpGet("{id}")] 
        public async Task<ActionResult<FeedbackDto>> GetFeedback(int id)
        {
            var feedback = await _repository.GetByIdAsync(id);

            if (feedback == null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<FeedbackDto>(feedback));
        }

        // POST: api/feedback
        [HttpPost]
        public async Task<ActionResult<FeedbackDto>> PostFeedback(CreateFeedbackDto createFeedbackDto)
        {
            var feedback = _mapper.Map<Feedback>(createFeedbackDto);
            var addedFeedback = await _repository.AddAsync(feedback);
            var feedbackDto = _mapper.Map<FeedbackDto>(addedFeedback);

            return CreatedAtAction(nameof(GetFeedback), new { id = feedbackDto.FeedbackId }, feedbackDto);
        }


        // DELETE: api/feedback/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteFeedback(int id)
        {
            var feedback = await _repository.GetByIdAsync(id);
           
            if (feedback == null)
            {
                return NotFound("Feedback not found");
            }
            await _repository.DeleteAsync(feedback.FeedbackId);

            return NoContent();
        }
    }
}
