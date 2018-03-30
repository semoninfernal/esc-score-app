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

        #region EVENTS
        public async Task<IEnumerable<Event>> ListEventsAsync(string userId)
        {
            return await _dbContext
                .Events
                .Include(e => e.EventParticipants)
                .Where(e => e.EventParticipants.Any(ep => ep.UserId == userId))
                .ToListAsync();
        }

        public async Task<Event> FindEventByIdAsync(int eventId)
        {
            var result = await _dbContext
                .Events
                .Include(e => e.EventParticipants)
                .ThenInclude(ep => ep.User)
                .ToListAsync();

            return result.FirstOrDefault();
        }

        public async Task<Event> CreateEventAsync(Event model, string userId)
        {
            var _event = await _dbContext
                .Events
                .AddAsync(
                    new Event
                    {
                        Name = model.Name,
                        Active = model.Active,
                        OwnerId = userId,
                        EventParticipants = new List<EventParticipant> {
                            new EventParticipant { UserId = userId }
                        }
                    }
            );
            await _dbContext.SaveChangesAsync();

            return _event.Entity;
        }
        #endregion

        #region MEMBERS
        public async Task<ApplicationUser> AddMemberAsync(Event _event, EventParticipant model)
        {
            var eventParticipant = await _dbContext
                .EventParticipants
                .AddAsync(
                    new EventParticipant
                    {
                        UserId = model.UserId,
                        EventId = _event.Id
                    }
            );

            await _dbContext.SaveChangesAsync();

            return await _dbContext.Users.FindAsync(eventParticipant.Entity.UserId);
        }

        public async Task RemoveMemberAsync(EventParticipant eventParticipant)
        {
            _dbContext.Remove(eventParticipant);
            await _dbContext.SaveChangesAsync();
        }
        #endregion

        #region ITEMS
        // TODO All event items should be included in the FindEventByIdAsync result, or in some overload to that method
        public async Task<IEnumerable<EventItem>> GetEventItemsAsync(int eventId) {
            // TODO This should include scores aswell
            return await _dbContext
                .EventItems
                .Where(ei => ei.EventId == eventId)
                .ToListAsync();
        }

        public async Task<EventItem> FindEventItemByIdAsync(int eventItemId) {
            return await _dbContext
                .EventItems
                .Where(ei => ei.Id == eventItemId)
                .FirstOrDefaultAsync();
        }

        public async Task<EventItem> AddEventItemAsync(Event _event, EventItem model) {
            var eventItem = await _dbContext
                .EventItems
                .AddAsync(
                    new EventItem
                    {
                        Name = model.Name,
                        Description = model.Description,
                        Image = model.Image,
                        SortIndex = model.SortIndex,
                        EventId = _event.Id
                    });

            await _dbContext.SaveChangesAsync();

            return eventItem.Entity;
        }
        #endregion

        #region SCORE TYPES
        public async Task<IEnumerable<EventScoreType>> GetEventScoreTypes(int eventId) {
            return await _dbContext
                .EventScoreTypes
                .Where(est => est.EventId == eventId)
                .ToListAsync();
        }

        public async Task<EventScoreType> AddScoreTypeAsync(Event _event, EventScoreType model) {
            var eventScoreType = await _dbContext
                .EventScoreTypes
                .AddAsync(
                    new EventScoreType
                    {
                        Name = model.Name,
                        Min = model.Min,
                        Max = model.Max,
                        EventId = _event.Id
                    }
            );

            await _dbContext.SaveChangesAsync();

            return eventScoreType.Entity;
        }
        #endregion
    }
}
