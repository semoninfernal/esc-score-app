﻿using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Web.Models;

namespace Web.Authorization
{
    public class EventAuthorizationHandler : AuthorizationHandler<OperationAuthorizationRequirement, Event>
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, OperationAuthorizationRequirement requirement, Event resource)
        {
            var userName = context.User.Identity?.Name;
            var isOwner = resource.Owner?.UserName == userName && userName != null;
            var isParticipant = (resource.EventParticipants?.Any(p => p.User?.UserName == userName)).Value && userName != null;

            if ((isParticipant || isOwner) && Operations.IsRead(requirement)) {
                context.Succeed(requirement);
            } else if (isOwner && (Operations.IsCreate(requirement) || Operations.IsUpdate(requirement) || Operations.IsDelete(requirement) ) ) {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}
