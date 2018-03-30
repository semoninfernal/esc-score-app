using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Web.Authorization
{
    public class ResourceAuthorizationHelper
    {
        private IAuthorizationService _authorizationService;

        public ResourceAuthorizationHelper(IAuthorizationService authorizationService)
        {
            _authorizationService = authorizationService;
        }

        public async Task<IActionResult> GetAuthorizedResourceAsync<TResource>(ClaimsPrincipal user, TResource resource, IAuthorizationRequirement requirement) {
            return await GetAuthorizedResultAsync(user, resource, requirement, () => new OkObjectResult(resource));
        }

        // Naming :/
        public async Task<IActionResult> GetAuthorizedResultAsync<TResource>(ClaimsPrincipal user, TResource resource, IAuthorizationRequirement requirement, Func<Task<IActionResult>> result) {
            var authorizationResult = await _authorizationService.AuthorizeAsync(user, resource, requirement);

            if (authorizationResult.Succeeded) {
                return await result();
            }

            return GetErrorResult(user);
        }

        public async Task<IActionResult> GetAuthorizedResultAsync<TResource>(ClaimsPrincipal user, TResource resource, IAuthorizationRequirement requirement, Func<IActionResult> result) {
            var authorizationResult = await _authorizationService.AuthorizeAsync(user, resource, requirement);

            if (authorizationResult.Succeeded)
            {
                return result();
            }

            return GetErrorResult(user);
        }

        private IActionResult GetErrorResult(ClaimsPrincipal user) {
            if (user.Identity.IsAuthenticated)
            {
                return new StatusCodeResult(403);
            }
            else
            {
                return new StatusCodeResult(401);
            }
        }
    }
}
