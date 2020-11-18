using CustomerApp.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;

namespace CustomerApp.Services
{
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

        public Customer Get(string id) =>
            _Customers.Find<Customer>(Customer => Customer.Id == id).FirstOrDefault();

        public Customer Create(Customer Customer)
        {
            _Customers.InsertOne(Customer);
            return Customer;
        }

        public void Update(string id, Customer CustomerIn) =>
            _Customers.ReplaceOne(Customer => Customer.Id == id, CustomerIn);

        public void Remove(Customer CustomerIn) =>
            _Customers.DeleteOne(Customer => Customer.Id == CustomerIn.Id);

        public void Remove(string id) => 
            _Customers.DeleteOne(Customer => Customer.Id == id);
    }
}