using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Web.Models
{
    public class EventScoreType : IValidatableObject
    {
        public int Id { get; set; }
        [Required]        
        public string Name { get; set; }
        public int Min { get; set; }
        public int Max { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Min >= Max) {
                yield return new ValidationResult($"Min ({Min} must be less than Max ({Max})");
            }
            if (Max <= Min) {
                yield return new ValidationResult($"Max ({Max}) must be greater than Min ({Min})");
            }
        }

        public int EventId { get; set; }
    }
}
