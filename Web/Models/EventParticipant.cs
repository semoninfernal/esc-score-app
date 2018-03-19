using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class EventParticipant
    {
        [Key]
        public int Id { get; set; }

        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }

        public int EventId { get; set; }
        public Event Event { get; set; }
    }
}