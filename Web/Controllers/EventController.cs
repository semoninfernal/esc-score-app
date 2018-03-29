using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Web.Data;
using Web.Models;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System;
using Dapper;
using Web.Filters;
using Web.Authorization;

namespace Web.Controllers
{
    [Route("/events")]
    public class EventController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private EventManager _eventManager;
        private IAuthorizationService _authorizationService;

        public EventController(UserManager<ApplicationUser> userManager, EventManager eventManager, IAuthorizationService authorizationService) {
            _userManager = userManager;
            _eventManager = eventManager;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Index() {
            var userId = _userManager.GetUserId(User);
            var events = await _eventManager.GetEventsAsync(userId);

            return new OkObjectResult(events);
        }

        [HttpGet]
        [Route("{id:int}")]
        [ValidateModel]
        public async Task<IActionResult> Find(int id)
        {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindByIdAsync(id);

            var authorizationResult = _authorizationService.AuthorizeAsync(User, _event, Operations.Read);

            if (authorizationResult.IsCompletedSuccessfully) {
                return new OkObjectResult(_event);
            } else if (User.Identity.IsAuthenticated) {
                return new ForbidResult();
            } else {
                return new ChallengeResult();
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Event model) {
            throw new NotImplementedException();
            // All actions except login and register is based on current user
            // Create a context wrapper that is initialized by an attribute that populates
            // user and event 
            //var user = await _userManager.GetUserAsync(User);

            //var eventResult = await _dbContext.Events.AddAsync(model);
            //var createdEvent = eventResult.Entity;

            //var participant = new EventParticipant
            //{
            //    ApplicationUserId = user.Id,
            //    EventId = createdEvent.Id,
            //};

            //var participantResult = await _dbContext.EventParticipants.AddAsync(participant);

            //// Add participant as owner of event
            //// await _dbContext.Events.Update()

            //return new CreatedResult($"/events/{createdEvent.Id}", createdEvent);
        }
    }
}