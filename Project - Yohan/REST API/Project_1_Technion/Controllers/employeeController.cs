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
    public class employeeController : ApiController
    {
        static employeeBL bl = new employeeBL();

        // GET: api/employee
        public IEnumerable<ExtendEmp> Get()
        {
            return bl.GetEmpDatas();
            
        }


        // GET: api/employee/5
        public ExtendEmp Get(int id)
        {
            return bl.GetEmpData(id);
        }

        // POST: api/employee
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/employee/5
        public string Put(int id, employee s)
        {
            bl.UpdateEmpData(id, s);
            return "Updated";
        }

        // DELETE: api/employee/5
        public string Delete(int id)
        {
            bl.DeleteEmp(id);
            return "Deleted";
        }
    }
}
