using System.Collections.Generic;

namespace CustomerApp.Models
{

    public class Page<T>
    {
        public long Total { get; set; }
        public List<T> Items { get; set; }
    }



}