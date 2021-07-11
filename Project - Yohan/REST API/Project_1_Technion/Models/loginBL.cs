using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Project_1_Technion.Models
{
    public class loginBL
    {
        factoryDBEntities db = new factoryDBEntities();
        //POST
        public bool IsUserExist(string user_name, string password)
        {
            var result = db.users.Where(x => x.user_name == user_name && x.password == password);
            if (result.Count() > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        //GET
        public List<ExtendUser> GetUserDatas()
        {
            var result = from user in db.users
                         select new ExtendUser
                         {
                             ID = user.ID,
                             full_name = user.full_name,
                             user_name = user.user_name,
                         };

            return result.ToList();
        }

        //GET by ID
        public ExtendUser GetUserData(int id)
        {
            {
                var result = from user in db.users

                              select new ExtendUser
                              {
                                  ID = user.ID,
                                  full_name = user.full_name,
                                  user_name = user.user_name,
                                  password = user.password
                              };

                return result.Where(x => x.ID == id).First();
            }
        }
    }
}