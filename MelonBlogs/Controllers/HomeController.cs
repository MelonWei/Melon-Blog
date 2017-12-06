using BlogBiz.NavigationBiz;
using BlogModel;
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
    public class HomeController : BaseController
    {
        [Import(typeof(INavigationDao))]
        public INavigationDao navDao { get; set; }

        public ActionResult Index()
        {
            ViewBag.Name = GetLoginUser().Name;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        [HttpGet]
        public JsonResult GetAllData(int id)
        {
            var data = navDao.GetAllData(id);
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetUserData()
        {
            var data = navDao.GetUser();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Login()
        {
            if ((Request["veriCode"] ?? "").ToString() != "魏梦龙") return View("Index");
            int id = navDao.AddUser(Request["userName"].ToString(), Request["userTel"].ToString());
            Session["UserId"] = id;
            Session["UserName"] = Request["userName"];
            ViewBag.Address = "Container";
            ViewBag.Name = GetLoginUser().Name;
            return View("Index");
        }

        [HttpPost]
        public JsonResult AddBookmark(BookmarkModel model)
        {
            if (string.IsNullOrEmpty(model.category) || string.IsNullOrEmpty(model.name) || string.IsNullOrEmpty(model.url))
            {
                return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
            }
            if (navDao.AddBookmark(model.userId, model.category, model.name, model.url))
            {
                return Json(new JsonPostResultModel { ok = true }, JsonRequestBehavior.DenyGet);
            }
            return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
        }
        [HttpPost]
        public JsonResult DelBookmark(BookmarkModel model)
        {
            if (string.IsNullOrEmpty(model.category) || string.IsNullOrEmpty(model.name) || string.IsNullOrEmpty(model.url))
            {
                return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
            }
            if (navDao.DelBookmark(model.userId, model.category, model.name, model.url))
            {
                return Json(new JsonPostResultModel { ok = true }, JsonRequestBehavior.DenyGet);
            }
            return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public JsonResult SaveCategory(BookmarkModel model)
        {
            if (string.IsNullOrEmpty(model.category))
            {
                return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
            }
            if (navDao.SaveCategory(model.userId, model.category))
            {
                return Json(new JsonPostResultModel { ok = true }, JsonRequestBehavior.DenyGet);
            }
            return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public JsonResult DelCategory(BookmarkModel model)
        {
            if (string.IsNullOrEmpty(model.category))
            {
                return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
            }
            if (navDao.DelCategory(model.userId, model.category))
            {
                return Json(new JsonPostResultModel { ok = true }, JsonRequestBehavior.DenyGet);
            }
            return Json(new JsonPostResultModel { ok = false }, JsonRequestBehavior.DenyGet);
        }
    }
}