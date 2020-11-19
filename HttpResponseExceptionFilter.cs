using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FluentValidation;
using Microsoft.AspNetCore.Mvc.Filters;

namespace CustomerApp.Http
{
    public class HttpResponseException : Exception
    {
        public int Status { get; set; } = 500;

        public object Value { get; set; }
    }

    public class HttpResponseExceptionFilter : IActionFilter, IOrderedFilter
    {
        public int Order { get; } = int.MaxValue - 10;

        public void OnActionExecuting(ActionExecutingContext context) { }

        public void OnActionExecuted(ActionExecutedContext context)
        {
            if (context.Exception is HttpResponseException httpException)
            {
                context.Result = new ObjectResult(httpException.Value)
                {
                    StatusCode = httpException.Status,
                };
                context.ExceptionHandled = true;
            }
            if( context.Exception is ValidationException validationException) {
                context.Result = new ObjectResult(validationException.Errors)
                {
                    StatusCode = 400,
                };
                context.ExceptionHandled = true;
            }
        }
    }
}