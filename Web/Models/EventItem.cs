using System;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class EventItem
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public string Image { get; set; }
        public int SortIndex { get; set; }

        public int EventId { get; set; }
    }
}
