using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Web.Models
{
    public class EventScore
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public int EventItemId { get; set; }
        [Required]
        public int EventScoreTypeId { get; set; }

        [JsonIgnore]
        public EventScoreType EventScoreType { get; set; }
        [JsonIgnore]
        public EventParticipant EventParticipant { get; set; }
    }
}
