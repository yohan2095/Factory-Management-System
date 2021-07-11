using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Project_1_Technion.Models;
namespace Project_1_Technion.Models
{
    public class employeeBL
    {
        factoryDBEntities db = new factoryDBEntities();
        shiftBL bl = new shiftBL();

        //GET ALL
        public List<ExtendEmp> GetEmpDatas()
        {
            var result2 = (from emp in db.employees
                          join dep in db.departments on emp.departmentID equals dep.ID
                          orderby emp.ID

                          select new ExtendEmp
                          {
                              ID = emp.ID,
                              fname = emp.fname,
                              lname = emp.lname,
                              startWorkYear = emp.startWorkYear,
                              name = dep.name,
                              departmentID = emp.departmentID,
                              manager = dep.manager,

                          }).ToList();
            foreach (var i in result2)
            {
                i.ExtendShiftz = bl.GetShftDatas().Where(x => x.employeeid == i.ID).ToList();
            }
            return result2 ;
        }


        //Get by ID
        public ExtendEmp GetEmpData(int id)
        {
            var result2 = (from emp in db.employees
                           join dep in db.departments on emp.departmentID equals dep.ID
                           orderby emp.ID

                           select new ExtendEmp
                           {
                               ID = emp.ID,
                               fname = emp.fname,
                               lname = emp.lname,
                               startWorkYear = emp.startWorkYear,
                               name = dep.name,
                               manager = dep.manager,
                               departmentID = emp.departmentID

                           }).ToList();
            foreach (var i in result2)
            {
                i.ExtendShiftz = bl.GetShftDatas().Where(x => x.employeeid == i.ID).ToList();
            }
            return result2.Where(x => x.ID == id).First();
        }

        //PUT
        public void UpdateEmpData(int id, employee s)
        {
            employee emp = db.employees.Where(x => x.ID == id).First();
            emp.fname = s.fname;
            emp.lname = s.lname;
            emp.departmentID = s.departmentID;

            db.SaveChanges();
        }


        //DELETE
        public void DeleteEmp(int id)
        {
            
            employee s = db.employees.Where(x => x.ID == id).First();
            db.employees.Remove(s);
            
            db.SaveChanges();
        }

    }
}