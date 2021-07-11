using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class userBL
    {
        factoryDBEntities db = new factoryDBEntities();

        public user getUserName(string username)
        {
            return db.users.Where(x => x.user_name == username).First();
        }
    }
}