using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Project_1_Technion.Models;
using System.Web.Http.Cors;

namespace Project_1_Technion.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    public class departmentController : ApiController
    {
        static departmentBL bl = new departmentBL();

        // GET: api/department
        public List<DepWithEmp> Get()
        {
            return bl.GetDepDatas();
        }

        // GET: api/department/5
        public DepWithEmp Get(int id)
        {
            return bl.GetDepData(id);
        }


        // POST: api/Student
        public int Post(department s)
        {
            return bl.CreateNewDep(s);

        }

        // PUT: api/department/5
        public string Put(int id, department depo)
        {
            bl.UpdateDepData(id, depo);
            return "Updated";
        }

        // DELETE: api/department/5
        public string Delete(int id)
        {
            bl.DeleteDep(id);
            return "Deleted";
        }
    }
}
