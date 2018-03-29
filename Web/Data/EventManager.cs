using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using Web.Models;

namespace Web.Data
{
    public class EventManager
    {
        private ApplicationDbContext _dbContext;

        public EventManager(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Event>> GetEventsAsync(string userId) {
            using (var connection = _dbContext.GetDbConnection())
            {
                await connection.OpenAsync();
                var query = @"
                    SELECT (e.id, e.name, e.ownerid)
                    FROM events e 
                    LEFT JOIN eventParticipants ep
                    ON e.id = ep.eventid 
                    WHERE ep.userid = @userId
                ";
                
                var events = await connection.QueryAsync<Event>(query, new { userId = new Guid(userId) });

                return events;
            }
        }

        public async Task<Event> FindByIdAsync(int eventId) {
            using (var connection = _dbContext.GetDbConnection()) {
                await connection.OpenAsync();

                // Mapping isnt working but the query is doing what it's supposed to
                var query = @"
                    SELECT e.name as ""Name"", e.id as ""Id"", e.active as ""Active"", e.ownerid as ""OwnerId"", ep.""UserName"", ep.userid as ""UserId"" FROM events e
                    LEFT JOIN
                        (SELECT u.""UserName"", u.""Id"" AS userid, 1 AS eventid FROM ""AspNetUsers"" u
                        LEFT JOIN eventparticipants p
                        ON u.""Id"" = p.userid and p.eventid = @eventId) ep
                    ON e.id = ep.eventid
                    WHERE e.id = @eventId
                ";
                var parameters = new { eventId };
                
                var lookup = new Dictionary<int, Event>();
                var result = await connection.QueryAsync<Event, EventParticipant, Event>(query, (e, ep) => {
                    if (!lookup.TryGetValue(e.Id, out Event _event)) {
                        lookup.Add(e.Id, _event = e);
                    }
                    if (_event.Participants == null) {
                        _event.Participants = new List<EventParticipant>();
                    }
                    if (ep != null) {
                        _event.Participants.Add(ep);
                    }
                    return _event;
                }, param: parameters);

                return result.FirstOrDefault();
            }
        }
    }
}
