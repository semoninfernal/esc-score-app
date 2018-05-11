using System;
namespace Web.Data
{
    [Flags]
    public enum LoadEventOptions
    {
        None,
        IncludeItems = 1
    }
}
