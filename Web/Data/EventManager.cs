using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Models;
using Microsoft.EntityFrameworkCore;

namespace Web.Data
{
    public class EventManager
    {
        private ApplicationDbContext _dbContext;

        public EventManager(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Event>> ListEventsAsync(string userId) {
            return await _dbContext
                .Events
                .Include(e => e.EventParticipants)
                .Where(e => e.EventParticipants.Any(ep => ep.UserId == userId))
                .ToListAsync();
        }

        public async Task<Event> FindEventByIdAsync(int eventId) {
            var result = await _dbContext
                .Events
                .Include(e => e.EventParticipants)
                .ThenInclude(ep => ep.User)
                .ToListAsync();

            return result.FirstOrDefault();
        }

        public async Task<Event> CreateEventAsync(Event model, string userId) {
            var _event = await _dbContext.AddAsync(new Event {
                Name = model.Name,
                Active = model.Active,
                OwnerId = userId,
                EventParticipants = new List<EventParticipant> {
                    new EventParticipant { UserId = userId }
                }
            });
            await _dbContext.SaveChangesAsync();

            return _event.Entity;
        }

        public async Task<ApplicationUser> AddMemberAsync(Event _event, EventParticipant model) {
            var eventParticipant = await _dbContext.EventParticipants.AddAsync(new EventParticipant
            {
                UserId = model.UserId,
                EventId = _event.Id
            });

            await _dbContext.SaveChangesAsync();

            return await _dbContext.Users.FindAsync(eventParticipant.Entity.UserId);
        }

        public async Task RemoveMemberAsync(EventParticipant eventParticipant) {
            _dbContext.Remove(eventParticipant);
            await _dbContext.SaveChangesAsync();
        }
    }
}
