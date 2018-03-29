using System;
using Microsoft.AspNetCore.Authorization.Infrastructure;

namespace Web.Authorization
{
    public static class Operations
    {
        public static OperationAuthorizationRequirement Create = new OperationAuthorizationRequirement { Name = nameof(Create) };
        public static OperationAuthorizationRequirement Read = new OperationAuthorizationRequirement { Name = nameof(Read) };
        public static OperationAuthorizationRequirement Update = new OperationAuthorizationRequirement { Name = nameof(Update) };
        public static OperationAuthorizationRequirement Delete = new OperationAuthorizationRequirement { Name = nameof(Delete) };

        public static bool IsCreate(OperationAuthorizationRequirement requirement) {
            return requirement.Name == Create.Name;
        }

        public static bool IsRead(OperationAuthorizationRequirement requirement) {
            return requirement.Name == Read.Name;
        }

        public static bool IsUpdate(OperationAuthorizationRequirement requirement) {
            return requirement.Name == Update.Name;
        }

        public static bool IsDelete(OperationAuthorizationRequirement requirement) {
            return requirement.Name == Delete.Name;
        }
    }
}
