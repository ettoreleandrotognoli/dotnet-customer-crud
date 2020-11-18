namespace CustomerApp.Models
{
    public class CustomerDatabaseSettings : ICustomerDatabaseSettings
    {
        public string CustomerCollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ICustomerDatabaseSettings
    {
        string CustomerCollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}