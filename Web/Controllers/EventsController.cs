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
    public class EventsController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private EventManager _eventManager;
        private ResourceAuthorizationHelper _resourceAuthorizationHelper;

        public EventsController(UserManager<ApplicationUser> userManager, EventManager eventManager, ResourceAuthorizationHelper resourceAuthorizationHelper) {
            _userManager = userManager;
            _eventManager = eventManager;
            _resourceAuthorizationHelper = resourceAuthorizationHelper;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> Index() {
            var userId = _userManager.GetUserId(User);
            var events = await _eventManager.ListEventsAsync(userId);

            return new OkObjectResult(events);
        }

        [HttpGet]
        [Route("{id:int}")]
        [ValidateModel]
        public async Task<IActionResult> Find(int id)
        {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(id);

            return await _resourceAuthorizationHelper.GetAuthorizedResourceAsync(User, _event, Operations.Read);
        }

        [HttpPost]
        [Authorize]
        [ValidateModel]
        public async Task<IActionResult> Create([FromBody] Event model) {
            var _event = await _eventManager.CreateEventAsync(model, _userManager.GetUserId(User));

            return new CreatedAtActionResult(nameof(Find), "Events", new { id = _event.Id }, _event );
        }
    }
}