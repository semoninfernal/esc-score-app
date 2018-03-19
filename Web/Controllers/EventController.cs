using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Web.Data;
using Web.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace Web.Controllers
{
    [Route("/events")]
    public class EventController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private ApplicationDbContext _dbContext;

        public EventController(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext) {
            _userManager = userManager;
            _dbContext = dbContext;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Index() {
            var user = await _userManager.GetUserAsync(User);
            var result = await _dbContext.Events.Where(e => e.Participants.Any(p => p.ApplicationUserId == user.Id)).ToListAsync();

            return new OkObjectResult(result);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize]
        public async Task<IActionResult> Find(int id) {
            var user = await _userManager.GetUserAsync(User);
            var result = await _dbContext.Events.FindAsync(id);

            if (result.Participants.Any(p => p.ApplicationUserId == user.Id)) {
                return new OkObjectResult(result);
            }

            return new NotFoundResult();
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Event model) {
            // All actions except login and register is based on current user
            // Create a context wrapper that is initialized by an attribute that populates
            // user and event 
            var user = await _userManager.GetUserAsync(User);

            var eventResult = await _dbContext.Events.AddAsync(model);
            var createdEvent = eventResult.Entity;

            var participant = new EventParticipant
            {
                ApplicationUserId = user.Id,
                EventId = createdEvent.Id,
            };

            var participantResult = await _dbContext.EventParticipants.AddAsync(participant);

            // Add participant as owner of event
            // await _dbContext.Events.Update()

            return new CreatedResult($"/events/{createdEvent.Id}", createdEvent);
        }
    }
}