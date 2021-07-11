using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class empshftBL
    {
        factoryDBEntities db = new factoryDBEntities();
        shiftBL bl = new shiftBL();
        //GET ALL
        public List<ExtendShftEmp> GetShftEmpDatas()
        {
            var result4 = (from shftemp in db.shifts
                           orderby shftemp.ID

                           select new ExtendShftEmp
                           {
                               ID = shftemp.ID,
                               date = shftemp.date,
                               startTime = shftemp.startTime,
                               endTime = shftemp.endTime

                           }).ToList();
            foreach (var i in result4)
            {
                i.ExtendShiftz = bl.GetShftDatas().Where(x => x.shiftid == i.ID).ToList();
            }
            return result4;
        }


        //GET BY ID
        public ExtendShftEmp GetShftEmpData(int id)
        {
            var result4 = from shftemp in db.shifts
                           orderby shftemp.ID

                           select new ExtendShftEmp
                           {
                               ID = shftemp.ID,
                               date = shftemp.date,
                               startTime = shftemp.startTime,
                               endTime = shftemp.endTime

                           };
            return result4.Where(x => x.ID == id).First();
        }

        //POST
        public int CreateNewShftEmp(shift s)
        {
            db.shifts.Add(s);

            db.SaveChanges();

            return s.ID;
        }

    }
}