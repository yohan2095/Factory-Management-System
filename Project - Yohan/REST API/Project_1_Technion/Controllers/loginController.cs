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

    public class loginController : ApiController
    {
        static loginBL bl = new loginBL();

        // GET: api/login
        public List<ExtendUser> Get()
        {
            return bl.GetUserDatas();
        }

        // GET: api/login/5
        public ExtendUser Get(int id)
        {
            return bl.GetUserData(id);
        }
       

        // POST: api/login
        public bool Post(user user)
        {
            return bl.IsUserExist(user.user_name, user.password);
        }

        // PUT: api/login/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/login/5
        public void Delete(int id)
        {
        }
    }
}
