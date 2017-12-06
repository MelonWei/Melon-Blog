using BlogModel.NavigationModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MelonBlogs.Controllers
{
    public class BaseController : Controller
    {
        protected override void Initialize(System.Web.Routing.RequestContext requestContext)
        {
            base.Initialize(requestContext);
            Session.Timeout = 10;
            ViewBag.Name = GetLoginUser().Name;
        }

        private static UserModel _user;

        private static readonly object locker = new object();
        public UserModel GetLoginUser()
        {
            if (_user == null)
            {
                lock (locker)
                {
                    if (_user == null)
                    {
                        if (Session["UserId"] == null)
                        {
                            _user = new UserModel
                            {
                                Id = 0,
                                Name = "SomeOne"
                            };
                        }
                        else
                        {
                            _user = new UserModel
                            {
                                Id = Convert.ToInt32(Session["UserId"]),
                                Name = Session["UserName"].ToString()
                            };
                        }
                    }
                }
            }
            else
            {
                _user.Id = Convert.ToInt32(Session["UserId"] ?? 0);
                _user.Name = (Session["UserName"] ?? "SomeOne").ToString();
            }
            return _user;
        }

    }
}