using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class ExtendShft
    {
        public int ID { get; set; }
        public string fname { get; set; }
        public string lname { get; set; }

        public int employeeid { get; set; }
        public int shiftid { get; set; }


        public System.DateTime date { get; set; }
        public int startTime { get; set; }
        public int endTime { get; set; }

        
    }
}