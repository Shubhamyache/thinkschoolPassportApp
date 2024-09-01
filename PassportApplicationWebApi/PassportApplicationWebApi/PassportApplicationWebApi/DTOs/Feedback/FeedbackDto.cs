using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace PassportApplicationWebApi.DTOs.Feedback
{
    public class FeedbackDto
    {
    
        public int FeedbackId { get; set; }

        
        public string Email { get; set; } = string.Empty;

   
        public int Rating { get; set; }
        
        public string FeedbackDetails { get; set; } = string.Empty;
    }
}
