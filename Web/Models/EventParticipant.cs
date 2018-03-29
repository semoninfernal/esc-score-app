using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public class EventParticipant
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}
