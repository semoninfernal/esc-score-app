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
            var _event = await _eventManager.FindEventByIdAsync(id);

            var authorizationResult = await _authorizationService.AuthorizeAsync(User, _event, Operations.Read);

            if (authorizationResult.Succeeded) {
                return new OkObjectResult(_event);
            } else if (User.Identity.IsAuthenticated) {
                return new StatusCodeResult(403);
            } else {
                return new StatusCodeResult(401);
            }
        }

        [HttpPost]
        [Authorize]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] Event model) {
            var _event = await _eventManager.CreateEventAsync(model, _userManager.GetUserId(User));

            return new CreatedAtActionResult("Find", "Event", new { id = _event.Id }, _event );
        }
    }
}