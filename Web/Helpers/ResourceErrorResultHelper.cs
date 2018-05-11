using System;
using Microsoft.AspNetCore.Mvc;
using Web.Data;

namespace Web.Helpers
{
    public static class ResourceErrorResultHelper
    {
        public static IActionResult CreateResourceErrorResult<TEntity>(Result<TEntity> result) {
            switch (result.Status)
            {
                case ResultType.NotFound:
                    return new NotFoundResult();
                case ResultType.Invalid:
                    return new BadRequestObjectResult(new { Message = result.Error });
                default:
                    return new BadRequestResult();
            }
        }
    }
}