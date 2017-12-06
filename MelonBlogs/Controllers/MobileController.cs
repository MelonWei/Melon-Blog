using BlogBiz.NavigationBiz;
using BlogModel.NavigationModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MelonBlogs.Controllers
{
    [Export]
    public class MobileController : BaseController
    {
        [Import(typeof(INavigationDao))]
        public INavigationDao navDao { get; set; }
        // GET: Mobile
        [Route("touch/nav/{id=1}")]
        public ActionResult Index(int id)
        {
            ViewBag.userId = id;
            return View();
        }

        [Route("touch/login")]
        public ActionResult Login(User user)
        {
            if (string.IsNullOrEmpty(user.userName))
                return View();
            var userId = navDao.IsUserExist(user.userName, user.userTel);
            if (userId == 0) return View();
            Session["UserId"] = userId;
            Session["UserName"] = user.userName;
            ViewBag.userId = GetLoginUser().Id;
            return RedirectToRoute(new { controller = "Mobile", action = "Index", id = userId });
        }
    }
}