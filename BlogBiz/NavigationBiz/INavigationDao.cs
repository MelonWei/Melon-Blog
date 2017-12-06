using BlogModel.NavigationModel;
using System.Collections.Generic;

namespace BlogBiz.NavigationBiz
{
    public interface INavigationDao
    {
        List<CategoryModel> GetAllData(int id);
        bool AddBookmark(int userId, string category, string name, string url);
        bool DelBookmark(int userId, string category, string name, string url);
        bool SaveCategory(int userId, string category);
        bool DelCategory(int userId, string category);
        List<UserModel> GetUser();
        int IsUserExist(string name, string phone);
        int AddUser(string name,string phone);
    }
}
