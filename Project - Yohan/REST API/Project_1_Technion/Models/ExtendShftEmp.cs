using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class ExtendShftEmp
    {
        public int ID { get; set; }
        public System.DateTime date { get; set; }
        public int startTime { get; set; }
        public int endTime { get; set; }

        public ExtendShftEmp()
        {
            ExtendShiftz = new List<ExtendShft>();
        }
        public List<ExtendShft> ExtendShiftz { get; set; }

        public int shiftid { get; set; }
    }
}