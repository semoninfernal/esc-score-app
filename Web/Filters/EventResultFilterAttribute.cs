using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Web.Models;

namespace Web.Filters
{
    public class EventResultFilterAttribute : ResultFilterAttribute
    {
		public override void OnResultExecuting(ResultExecutingContext context)
		{
            if (context.Result is ObjectResult result && result.Value is Event _event) {
                _event.OwnerId = null;
                _event.EventParticipants = null;

                context.Result = new ObjectResult(_event);
            }
		}
    }
}
