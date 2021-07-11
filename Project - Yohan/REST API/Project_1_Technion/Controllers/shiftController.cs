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
    public class shiftController : ApiController
    {
        
        static empshftBL bl = new empshftBL();
        // GET: api/shift
        public IEnumerable<ExtendShftEmp> Get()
        {
            return bl.GetShftEmpDatas();

        }

        // GET: api/shift/5
        public ExtendShftEmp Get(int id)
        {
            return bl.GetShftEmpData(id);
        }

        // POST: api/shift
        public int Post(shift s)
        {
            return bl.CreateNewShftEmp(s);

        }
        

        // PUT: api/shift/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/shift/5
        public void Delete(int id)
        {
        }
    }
}
