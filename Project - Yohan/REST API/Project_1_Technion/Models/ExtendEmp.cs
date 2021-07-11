using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class ExtendEmp
    {

        public int ID { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }
        public int startWorkYear { get; set; }
        public int departmentID { get; set; }
        public string name { get; set; }
        public int manager { get; set; }

        

        public ExtendEmp()
        {
            ExtendShiftz = new List<ExtendShft>();
        }
        public List<ExtendShft> ExtendShiftz { get; set; }

        


    }

  
}