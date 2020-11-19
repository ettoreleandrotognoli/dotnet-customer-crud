using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace CustomerApp.Models
{

    public class Phone
    {
        public string Number { get; set; }
        public string Name { get; set; }
    }

    public class Site
    {
        public string Url { get; set; }
    }

    public class Address
    {
        public string Street { get; set; }

        public string Number { get; set; }

        public string ZipCode { get; set; }

        public string Name { get; set; }
    }


    public class Customer
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Name")]
        public string Name { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime? birthday { get; set; }

        public string Cpf { get; set; }

        public string Rg { get; set; }

        public List<Phone> Phones { get; set; }

        public List<Address> Addresses { get; set; }

        public List<Site> Sites { get; set; }

    }
}