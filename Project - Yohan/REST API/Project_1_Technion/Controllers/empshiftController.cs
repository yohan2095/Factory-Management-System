using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Project_1_Technion.Models;

namespace Project_1_Technion.Controllers
{
    [EnableCors(origins: "*", methods: "*", headers: "*")]
    public class empshiftController : ApiController
    {

        static shiftBL bl = new shiftBL();

        // GET: api/empshift
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/empshift/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/empshift
        public int Post(employee_shift s)
        {
            return bl.CreateNewShft(s);

        }

        // PUT: api/empshift/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/empshift/5
        public void Delete(int id)
        {
        }
    }
}
