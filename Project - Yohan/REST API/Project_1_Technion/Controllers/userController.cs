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
    public class userController : ApiController
    {
        static userBL bl = new userBL();
        // GET: api/user
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/user/5


        // POST: api/user
        public IHttpActionResult Post(user u)
        {
            return Ok(new { user = bl.getUserName(u.user_name) });

        }

        // PUT: api/user/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/user/5
        public void Delete(int id)
        {
        }
    }
}
