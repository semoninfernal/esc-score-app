using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web.Authorization;
using Web.Data;
using Web.Filters;
using Web.Models;

namespace Web.Controllers
{
    [Route("/events/{eventId:int}/members")]
    public class EventMembersController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private EventManager _eventManager;
        private ResourceAuthorizationHelper _resourceAuthorizationHelper;

        public EventMembersController(UserManager<ApplicationUser> userManager, EventManager eventManager, ResourceAuthorizationHelper resourceAuthorizationHelper)
        {
            _userManager = userManager;
            _eventManager = eventManager;
            _resourceAuthorizationHelper = resourceAuthorizationHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Index(int eventId)
        {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Read, () =>
            {
                return new OkObjectResult(_event.EventParticipants.Select(ep => ep.User));
            });
        }

        [HttpGet]
        [Route("{memberId}")]
        public async Task<IActionResult> Find(int eventId, string memberId) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Read, () =>
            {
                var eventParticipant = _event.EventParticipants.Select(ep => ep.User).FirstOrDefault(u => u.Id == memberId);

                if (eventParticipant == null) {
                    return new NotFoundResult();
                }

                return new OkObjectResult(eventParticipant);
            });
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create(int eventId, [FromBody] EventParticipant model) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Create, async () =>
            {
                var user = await _eventManager.AddMemberAsync(_event, model);

                return new CreatedAtActionResult("Find", "EventMembers", new { eventId, memberId = user }, user );
            });
        }

        [HttpDelete]
        [Route("{memberId}")]
        public async Task<IActionResult> Delete(int eventId, string memberId) {
            var userId = _userManager.GetUserId(User);
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Delete, async () =>
            {

                var eventParticipant = _event.EventParticipants.FirstOrDefault(ep => ep.UserId == memberId);
                if (eventParticipant == null) {
                    return new NotFoundResult();
                }

                // You can't remove yourself
                if (eventParticipant.UserId == userId) {
                    return BadRequest();
                }
                
                await _eventManager.RemoveMemberAsync(eventParticipant);

                return new NoContentResult();
            });
        }
    }
}
