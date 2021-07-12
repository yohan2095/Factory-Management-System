using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class DepWithEmp
    {
        factoryDBEntities db = new factoryDBEntities();

        public int ID { get; set; }
        public string name { get; set; }
        public int manager { get; set; }

        public string fname { get; set; }
        public string lname { get; set; }
        public int departmentID { get; set; }

        
    }
}