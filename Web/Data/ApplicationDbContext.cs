using System.Data.Common;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Web.Models;

namespace Web.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Event> Events { get; set; }
        public DbSet<EventParticipant> EventParticipants { get; set; }
        public DbSet<EventItem> EventItems { get; set; }
        public DbSet<EventScoreType> EventScoreTypes { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<EventParticipant>()
                   .HasKey(ep => new { ep.EventId, ep.UserId });

            builder.Entity<EventParticipant>()
                   .HasOne(ep => ep.Event)
                   .WithMany(e => e.EventParticipants)
                   .HasForeignKey(ep => ep.EventId);

            builder.Entity<EventParticipant>()
                   .HasOne(ep => ep.User)
                   .WithMany(u => u.Events)
                   .HasForeignKey(ep => ep.UserId);

            builder.Entity<EventItem>()
                   .HasIndex(ei => new { ei.Name, ei.EventId })
                   .IsUnique();

            builder.Entity<EventScoreType>()
                   .HasIndex(est => new { est.Name, est.EventId })
                   .IsUnique();
        }
    }
}
