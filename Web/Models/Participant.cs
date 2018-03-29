using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public class Participant
    {
        public Participant()
        {
            public int Id { get; set; }

            public string ApplicationUserId { get; set; }

            [NotMapped]
            public string UserName { get; set; }
        }
    }
}
