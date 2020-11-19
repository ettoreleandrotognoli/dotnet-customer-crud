using CustomerApp.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;

namespace CustomerApp.Services
{

    public class AddressValidator : AbstractValidator<Address>{
        public AddressValidator() {
            RuleFor( address => address.Number).NotEmpty();
            RuleFor( address => address.Street).NotEmpty();
            RuleFor( address => address.ZipCode).NotEmpty();
        }
    }

    public class SiteValidator : AbstractValidator<Site>{
        public SiteValidator() {
            RuleFor( site => site.Url).NotEmpty();
        }
    }

     public class PhoneValidator : AbstractValidator<Phone>{
        public PhoneValidator() {
            RuleFor( phone => phone.Number).NotEmpty();
        }
    }

    public class CustomerValidator : AbstractValidator<Customer> {
        public CustomerValidator() {
            RuleFor( customer => customer.Name).NotEmpty();
            RuleForEach( customer => customer.Addresses).SetValidator(new AddressValidator());
            RuleForEach( customer => customer.Phones).SetValidator(new PhoneValidator());
            RuleForEach( customer => customer.Sites).SetValidator(new SiteValidator());
        }
    }

    public class CustomerService
    {
        private readonly IMongoCollection<Customer> _Customers;

        public CustomerService(ICustomerDatabaseSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _Customers = database.GetCollection<Customer>(settings.CustomerCollectionName);
        }

        public List<Customer> Get() =>
            _Customers.Find(Customer => true).ToList();


        public Page<Customer> Page(int offset, int limit, string q)
        {
            var filter = Builders<Customer>.Filter.Regex("Name", new BsonRegularExpression(q, "gi"));
            var query = _Customers.Find(filter);
            var total = query.CountDocuments();
            var items = query.Skip(offset).Limit(limit).ToList();
            return new Page<Customer> { Total = total, Items = items };
        }

        public Customer Get(string id) =>
            _Customers.Find<Customer>(Customer => Customer.Id == id).FirstOrDefault();

        public Customer Create(Customer customer)
        {
            var validator = new CustomerValidator();
            var results = validator.Validate(customer, options => options.ThrowOnFailures());
            _Customers.InsertOne(customer);
            return customer;
        }

        public void Update(string id, Customer customerIn) {
            var validator = new CustomerValidator();
            var results = validator.Validate(customerIn, options => options.ThrowOnFailures());
            _Customers.ReplaceOne(Customer => Customer.Id == id, customerIn);
        }

        public void Remove(Customer CustomerIn) =>
            _Customers.DeleteOne(Customer => Customer.Id == CustomerIn.Id);

        public void Remove(string id) =>
            _Customers.DeleteOne(Customer => Customer.Id == id);
    }
}