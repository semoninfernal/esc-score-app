using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Web.Authorization;
using Web.Data;
using Web.Filters;
using Web.Helpers;
using Web.Models;

namespace Web.Controllers
{
    [Route("/events/{eventId:int}/items/{itemId:int}/scores")]
    public class EventScoresController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private EventManager _eventManager;
        private ResourceAuthorizationHelper _resourceAuthorizationHelper;

        public EventScoresController(UserManager<ApplicationUser> userManager, EventManager eventManager, ResourceAuthorizationHelper resourceAuthorizationHelper)
        {
            _userManager = userManager;
            _eventManager = eventManager;
            _resourceAuthorizationHelper = resourceAuthorizationHelper;
        }

        [HttpPost]
        [ValidateModel]
        public async Task<IActionResult> Create(int eventId, int itemId, [FromBody] EventScore model) {
            var _event = await _eventManager.FindEventByIdAsync(eventId);

            if (_event == null) {
                return new NotFoundResult();
            }

            // Use the read operation requirement since anyone with reading rights can create scores
            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, _event, Operations.Read, async () =>
            {
                var userId = _userManager.GetUserId(User);
                var result = await _eventManager.AddEventScoreAsync(_event, itemId, userId, model);

                if (result.Success) {
                    return new CreatedAtActionResult("Find", "EventItems", new { eventId, itemId }, result.Entity);
                }

                return ResourceErrorResultHelper.CreateResourceErrorResult(result);
            });
        }

        [HttpPatch]
        [Route("{scoreId:int}")]
        public async Task<IActionResult> Update(int eventId, int itemId, int scoreId, [FromBody] EventScore model) {
            var eventScore = await _eventManager.FindEventScoreByIdAsync(scoreId);

            return await _resourceAuthorizationHelper.GetAuthorizedResultAsync(User, eventScore, Operations.Update, async () =>
            {
                var result = await _eventManager.UpdateEventScoreAsync(eventScore, model.Value);

                if (result.Success) {
                    return new OkObjectResult(result.Entity);
                }

                return ResourceErrorResultHelper.CreateResourceErrorResult(result);
            });
        }

        private async Task<string> ValidateInputAsync(int score, int scoreTypeId) {
            var eventScoreType = await _eventManager.FindEventScoreTypeByIdAsync(scoreTypeId);

            if (score > eventScoreType.Max)
            {
                return $"Värdet får max vara {eventScoreType.Max}";
            }
            else if (score < eventScoreType.Min)
            {
                return $"Värdet får minst vara {eventScoreType.Min}";
            }

            return null;
        }
    }
}
