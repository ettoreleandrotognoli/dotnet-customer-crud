using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CustomerApp.Models;
using CustomerApp.Services;


namespace CustomerApp.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;

        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public ActionResult<Page<Customer>> Get(int offset=0, int limit = 10) =>
            _customerService.Page(offset, limit);

        [HttpGet("{id:length(24)}", Name = "GetCustomer")]
        public ActionResult<Customer> Get(string id)
        {
            var customer = _customerService.Get(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        [HttpPost]
        public ActionResult<Customer> Create(Customer customer)
        {
            _customerService.Create(customer);

            return CreatedAtRoute("GetCustomer", new { id = customer.Id.ToString() }, customer);
        }

        [HttpPut("{id:length(24)}")]
        public IActionResult Update(string id, Customer customerIn)
        {
            var customer = _customerService.Get(id);

            if (customer == null)
            {
                return NotFound();
            }

            _customerService.Update(id, customerIn);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var customer = _customerService.Get(id);

            if (customer == null)
            {
                return NotFound();
            }

            _customerService.Remove(customer.Id);

            return NoContent();
        }
    }
}