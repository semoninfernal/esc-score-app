using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using Web.Models;

namespace Web.Models
{
    public class Event
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        public bool Active { get; set; }

        [JsonIgnore]
        public string OwnerId { get; set;  }

        public ApplicationUser Owner { get; set; }

        [JsonIgnore]
        public List<EventParticipant> EventParticipants { get; set; }

        public List<EventItem> EventItems { get; set; }
        public List<EventScoreType> EventScoreTypes { get; set; }
    }
}