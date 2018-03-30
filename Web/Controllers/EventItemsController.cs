using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web.Authorization;
using Web.Data;
using Web.Models;

namespace Web.Controllers
{
    [Route("/events/{eventId:int}/items")]
    public class EventItemsController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private EventManager _eventManager;
        private ResourceAuthorizationHelper _resourceAuthorizationHelper;

        public EventItemsController(UserManager<ApplicationUser> userManager, EventManager eventManager, ResourceAuthorizationHelper resourceAuthorizationHelper)
        {
            _userManager = userManager;
            _eventManager = eventManager;
            _resourceAuthorizationHelper = resourceAuthorizationHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int eventId) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            if (_event == null) {
                return new NotFoundResult();
            }

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Read, async () =>
            {
                var eventItems = await _eventManager.GetEventItemsAsync(_event.Id);

                return new OkObjectResult(eventItems);
            });
        }

        [HttpGet]
        [Route("{itemId:int}")]
        public async Task<IActionResult> Find(int eventId, int itemId) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            if (_event == null) {
                return new NotFoundResult();
            }

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Read, async () =>
            {
                var eventItem = await _eventManager.FindEventItemByIdAsync(itemId);

                if (eventItem == null)
                {
                    return new NotFoundResult();
                }

                return new OkObjectResult(eventItem);
            });
        }

        public async Task<IActionResult> Create(int eventId, [FromBody] EventItem model) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            if (_event == null) {
                return new NotFoundResult();
            }

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Create, async () =>
            {
                var eventItem = await _eventManager.AddEventItemAsync(_event, model);

                return new CreatedAtActionResult(nameof(Find), "EventItems", new { eventId, itemId = eventItem.Id }, eventItem);
            });
        }
    }
}
