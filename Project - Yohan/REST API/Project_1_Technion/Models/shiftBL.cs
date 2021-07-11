using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class shiftBL
    {
        factoryDBEntities db = new factoryDBEntities();
        public List<ExtendShft> GetShftDatas()
        {
            var result3 = from emp in db.employees
                          join emps in db.employee_shift on emp.ID equals emps.employeeid
                          join shft in db.shifts on emps.shiftid equals shft.ID
                          orderby shft.ID
                          select new ExtendShft
                          {
                              ID = shft.ID,
                              employeeid = emps.employeeid,
                              fname = emp.fname,
                              lname = emp.lname,
                              shiftid = emps.shiftid,
                              date = shft.date,
                              startTime = shft.startTime,
                              endTime = shft.endTime
                          };
            return result3.ToList();
        }


        //get by ID
        public ExtendShft GetShftData(int id)
        {
            var result3 = from emp in db.employees
                          join emps in db.employee_shift on emp.ID equals emps.employeeid
                          join shft in db.shifts on emps.shiftid equals shft.ID
                          orderby shft.ID
                          select new ExtendShft
                          {
                              ID = shft.ID,
                              employeeid = emps.employeeid,
                              fname = emp.fname,
                              lname = emp.lname,
                              shiftid = emps.shiftid,
                              date = shft.date,
                              startTime = shft.startTime,
                              endTime = shft.endTime
                          };

            return result3.Where(x => x.ID == id).First();
        }


        //POST
        public int CreateNewShft(employee_shift s)
        {
            db.employee_shift.Add(s);

            db.SaveChanges();

            return s.ID;
        }
    }
}