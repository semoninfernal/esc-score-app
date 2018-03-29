using System;
using Web.Models;

namespace Web.Filters
{
    public static class ResultFormatters
    {
        public static ApplicationUser FormatAsResult(this ApplicationUser user) {
            user.ConcurrencyStamp = null;
            user.Email = null;

            return user;
        }
    }
}
