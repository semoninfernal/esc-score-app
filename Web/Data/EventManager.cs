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
            return await FindEventByIdAsync(eventId, LoadEventOptions.None);
        }

        public async Task<Event> FindEventByIdAsync(int eventId, LoadEventOptions options)
        {
            var query = _dbContext
                .Events
                .Include(e => e.EventParticipants)
                .ThenInclude(ep => ep.User);

            if (options.HasFlag(LoadEventOptions.IncludeItems))
            {
                query.Include(e => e.EventItems);
            }

            return await query.FirstOrDefaultAsync();
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
        public async Task<Result<ApplicationUser>> AddMemberAsync(Event _event, EventParticipant model)
        {
            if (_event.EventParticipants.Any(p => p.UserId == model.UserId))
            {
                return Result<ApplicationUser>.CreateFailResult(ResultType.Invalid, "User is allready member of event");
            }

            var eventParticipant = await _dbContext
                .EventParticipants
                .AddAsync(
                    new EventParticipant
                    {
                        UserId = model.UserId,
                        EventId = _event.Id
                    });

            try
            {
                await _dbContext.SaveChangesAsync();
                var user = await _dbContext.Users.FindAsync(eventParticipant.Entity.UserId);

                return Result<ApplicationUser>.CreateSuccessResult(user);
            }
            catch (Exception ex)
            {
                return Result<ApplicationUser>.CreateFailResult(ex);
            }
        }

        public async Task RemoveMemberAsync(EventParticipant eventParticipant)
        {
            _dbContext.Remove(eventParticipant);
            await _dbContext.SaveChangesAsync();
        }
        #endregion

        #region ITEMS
        public async Task LoadEventItemsAsync(Event _event)
        {
            await _dbContext.Entry(_event)
                .Collection(e => e.EventItems)
                .LoadAsync();
        }

        // TODO All event items should be included in the FindEventByIdAsync result, or in some overload to that method
        public async Task<IEnumerable<EventItem>> ListEventItemsAsync(int eventId, string userId)
        {
            var eventItems = await _dbContext
                .EventItems
                .Where(ei => ei.EventId == eventId)
                .Include(ei => ei.EventScores)
                .ToListAsync();

            foreach (var eventItem in eventItems)
            {
                FilterEventItemScores(eventItem, userId);
            }

            return eventItems;
        }

        public async Task<EventItem> FindEventItemByIdAsync(int eventItemId, string userId)
        {
            var eventItem = await _dbContext
                .EventItems
                .Where(ei => ei.Id == eventItemId)
                .Include(ei => ei.EventScores)
                .FirstOrDefaultAsync();

            FilterEventItemScores(eventItem, userId);

            return eventItem;
        }

        private void FilterEventItemScores(EventItem eventItem, string userId)
        {
            eventItem.EventScores = eventItem.EventScores.Where(es => es.EventParticipant.UserId == userId).ToList();
        }

        public async Task<EventItem> AddEventItemAsync(Event _event, EventItem model)
        {
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
        public async Task<IEnumerable<EventScoreType>> ListEventScoreTypes(int eventId)
        {
            return await _dbContext
                .EventScoreTypes
                .Where(est => est.EventId == eventId)
                .ToListAsync();
        }

        public async Task<EventScoreType> AddScoreTypeAsync(Event _event, EventScoreType model)
        {
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

        #region SCORES
        public async Task<EventScore> FindEventScoreByIdAsync(int eventScoreId)
        {
            return await _dbContext
                .EventScores
                .Include(es => es.EventParticipant)
                    .ThenInclude(ep => ep.User)
                .FirstOrDefaultAsync(es => es.Id == eventScoreId);
        }

        public async Task<Result<EventScore>> AddEventScoreAsync(Event _event, int itemId, string userId, EventScore model)
        {
            var (isValid, error) = await ValidateEventScoreAsync(model.Value, model.EventScoreTypeId);
            if (!isValid)
            {
                return Result<EventScore>.CreateFailResult(ResultType.Invalid, error);
            }

            var eventScore = await _dbContext
                .EventScores
                .AddAsync(new EventScore
                {
                    Value = model.Value,
                    EventScoreTypeId = model.EventScoreTypeId,
                    EventItemId = itemId,
                    EventParticipant = _event.EventParticipants.First(ep => ep.UserId == userId)
                });
            try
            {
                await _dbContext.SaveChangesAsync();

                return Result<EventScore>.CreateSuccessResult(eventScore.Entity);
            }
            catch (Exception ex)
            {
                return Result<EventScore>.CreateFailResult(ex);
            }
        }

        public async Task<Result<EventScore>> UpdateEventScoreAsync(EventScore eventScore, int score)
        {
            var (isValid, error) = await ValidateEventScoreAsync(score, eventScore.EventScoreTypeId);
            if (!isValid)
            {
                return Result<EventScore>.CreateFailResult(ResultType.Invalid, error);
            }

            var entry = _dbContext.Attach(eventScore);
            entry.Entity.Value = score;

            await _dbContext.SaveChangesAsync();

            return Result<EventScore>.CreateSuccessResult(entry.Entity);
        }

        private async Task<(bool, string)> ValidateEventScoreAsync(int value, int eventScoreTypeId)
        {
            var eventScoreType = await _dbContext
                .EventScoreTypes
                .FindAsync(eventScoreTypeId);

            var isValid = false;
            string error = null;

            if (value > eventScoreType.Max)
            {
                error = $"Värdet får max vara {eventScoreType.Max}";
            }
            else if (value < eventScoreType.Min)
            {
                error = $"Värdet får minst vara {eventScoreType.Min}";
            }
            else
            {
                isValid = true;
            }

            return (isValid, error);
        }
        #endregion

        #region SCORE TYPES
        public async Task<EventScoreType> FindEventScoreTypeByIdAsync(int eventScoreTypeId) {
            return await _dbContext
                .EventScoreTypes
                .FindAsync(eventScoreTypeId);
        }
        #endregion
    }
}
