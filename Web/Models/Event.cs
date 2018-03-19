using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Web.Models;

namespace Web.Models
{
    public class Event {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; }

        public bool Active { get; set; }

        public int OwnerId { get; set;  }

        public EventParticipant Owner { get; set; }

        public List<EventParticipant> Participants { get; set; }
    }
}