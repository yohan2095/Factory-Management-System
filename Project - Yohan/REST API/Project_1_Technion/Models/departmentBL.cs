using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class departmentBL
    {
        factoryDBEntities db = new factoryDBEntities();

        public List<DepWithEmp> GetDepDatas()
        {
            var result = from dep in db.departments
                         join emp in db.employees
                         on dep.manager equals emp.ID
                         select new DepWithEmp
                         {
                             ID = dep.ID,
                             name = dep.name,
                             manager = dep.manager,
                             fname = emp.fname,
                             lname = emp.lname,
                             departmentID = emp.departmentID,
                             
                             
                         };
            return result.ToList();
        }


        public DepWithEmp GetDepData(int id)
        {
            var result = from department in db.departments
                         join emp in db.employees on department.manager equals emp.ID
                         select new DepWithEmp
                         {
                             ID = department.ID,
                             name = department.name,
                             manager = department.manager,
                             fname = emp.fname,
                             lname = emp.lname,
                             departmentID = emp.departmentID,
                         };

            return result.Where(x => x.ID == id).First();
        }

        public void UpdateDepData(int id, department s, employee z)
        {
            department dep = db.departments.Where(x => x.ID == id).First();
            dep.name = s.name;
            dep.manager = s.manager;

            employee emp = db.employees.Where(x => x.ID == id).First();
            emp.departmentID = z.departmentID;
            

            db.SaveChanges();

        }


        public int CreateNewDep(department s)
        {
            db.departments.Add(s);

            db.SaveChanges();

            return s.ID;
        }


        public void DeleteDep(int id)
        {
            department s = db.departments.Where(x => x.ID == id).First();
            db.departments.Remove(s);

            db.SaveChanges();
            
        }
    }
}