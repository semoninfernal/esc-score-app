using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web.Authorization;
using Web.Data;
using Web.Filters;
using Web.Models;

namespace Web.Controllers
{
    [Route("/events/{eventId:int}/scoretypes")]
    public class EventScoreTypesController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private EventManager _eventManager;
        private ResourceAuthorizationHelper _resourceAuthorizationHelper;

        public EventScoreTypesController(UserManager<ApplicationUser> userManager, EventManager eventManager, ResourceAuthorizationHelper resourceAuthorizationHelper)
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
                var eventScoreTypes = await _eventManager.GetEventScoreTypes(_event.Id);

                return new OkObjectResult(eventScoreTypes);
            });
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create(int eventId, [FromBody] EventScoreType model) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            if (_event == null) {
                return new NotFoundResult();
            }

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Create, async () =>
            {
                var eventScoreType = await _eventManager.AddScoreTypeAsync(_event, model);

                // We have no need for a Find action in this resource, created at index will have to do
                return new CreatedAtActionResult(nameof(Index), "EventScoreTypes", new { eventId }, eventScoreType);
            });
        }
    }
}
