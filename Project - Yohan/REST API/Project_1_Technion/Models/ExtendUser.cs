using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class ExtendUser
    {
        public int ID { get; set; }
        public string full_name { get; set; }
        public string user_name { get; set; }
        public string password { get; set; }
        public int numOfActions { get; set; }
    }
}