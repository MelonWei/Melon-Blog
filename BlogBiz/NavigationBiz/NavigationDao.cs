using BlogModel.NavigationModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.Composition;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BlogBiz.NavigationBiz
{
    [Export(typeof(INavigationDao))]
    public class NavigationDao : INavigationDao
    {
        public List<CategoryModel> GetAllData(int id)
        {
            using (var context = new NavigationDataContext())
            {
                return context.Nav_Category.Where(c => c.UserId == id).Select(p => new CategoryModel
                {
                    CategoryName = p.Name,
                    Sites = context.Nav_Site.Where(t => t.CategoryId == p.Id).Select(q => new SiteModel { Name = q.Name, Url = q.Url }).ToList()
                }).ToList();
            }
        }

        public List<UserModel> GetUser()
        {
            using (var context = new NavigationDataContext())
            {
                return context.Blog_User.Select(p => new UserModel
                {
                    Id = p.Id,
                    Name = p.Name
                }).ToList();
            }
        }

        public int AddUser(string name, string phone)
        {
            using (var context = new NavigationDataContext())
            {
                var model = context.Blog_User.Where(p => p.Name == name && p.Phone == phone).FirstOrDefault();
                if (model != null) return model.Id;
                var newUser = context.Blog_User.Add(new Blog_User { Name = name, Phone = phone });
                context.SaveChanges();
                return newUser.Id;
            }
        }

        public int IsUserExist(string name, string phone)
        {
            using (var context = new NavigationDataContext())
            {
                var model = context.Blog_User.Where(p => p.Name == name && p.Phone == phone).FirstOrDefault();
                if (model != null) return model.Id;
                return 0;
            }
        }

        public bool AddBookmark(int userId, string category, string name, string url)
        {
            using (var context = new NavigationDataContext())
            {
                var cateId = context.Nav_Category.Where(p => p.Name == category && p.UserId == userId).FirstOrDefault().Id;
                var instance = context.Nav_Site.Where(p => p.Name == name && p.Url == url && p.CategoryId == cateId).FirstOrDefault();
                if (instance == null)
                {
                    context.Nav_Site.Add(new Nav_Site { CategoryId = cateId, Name = name, Url = url });
                }
                return context.SaveChanges() > 0;
            }
        }

        public bool DelBookmark(int userId, string category, string name, string url)
        {
            using (var context = new NavigationDataContext())
            {
                var cateId = context.Nav_Category.Where(p => p.Name == category && p.UserId == userId).FirstOrDefault().Id;
                var instance = context.Nav_Site.Where(p => p.Name == name && p.Url == url && p.CategoryId == cateId).FirstOrDefault();
                if (instance == null) return true;
                context.Nav_Site.Remove(instance);
                return context.SaveChanges() > 0;
            }
        }

        public bool SaveCategory(int userId, string category)
        {
            using (var context = new NavigationDataContext())
            {
                var cate = context.Nav_Category.Where(p => p.Name == category && p.UserId == userId).FirstOrDefault();
                if (cate != null) return true;
                context.Nav_Category.Add(new Nav_Category { Name = category, UserId = userId });
                return context.SaveChanges() > 0;
            }
        }

        public bool DelCategory(int userId, string category)
        {
            using (var context = new NavigationDataContext())
            {
                var cate = context.Nav_Category.Where(p => p.Name == category && p.UserId == userId).FirstOrDefault();
                if (cate == null) return true;
                var siteList = context.Nav_Site.Where(p => p.CategoryId == cate.Id);
                context.Nav_Site.RemoveRange(siteList);
                context.Nav_Category.Remove(cate);
                return context.SaveChanges() > 0;
            }
        }
    }
}
