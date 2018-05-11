using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Web.Models;

namespace Web.Authorization
{
    public class EventScoreAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, EventScore>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, EventScore resource)
        {
            var userName = context.User.Identity?.Name;
            var isOwner = resource.EventParticipant.User.UserName == userName;

            if (isOwner) {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
