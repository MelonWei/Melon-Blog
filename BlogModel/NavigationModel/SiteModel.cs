using System.Collections.Generic;
using Newtonsoft.Json;

namespace BlogModel.NavigationModel
{
    public class SiteModel
    {
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("url")]
        public string Url { get; set; }
    }

    public class CategoryModel
    {
        [JsonProperty("categoryName")]
        public string CategoryName { get; set; }
        [JsonProperty("sites")]
        public List<SiteModel> Sites { get; set; }
    }

    public class UserModel
    {
        [JsonProperty("id")]
        public int Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
    }

    public class User
    {
        [JsonProperty("userTel")]
        public string userTel { get; set; }
        [JsonProperty("userName")]
        public string userName { get; set; }
    }

    public class BookmarkModel {
        [JsonProperty("userId")]
        public int userId { get; set; }
        [JsonProperty("name")]
        public string name { get; set; }
        [JsonProperty("url")]
        public string url { get; set; }
        [JsonProperty("category")]
        public string category { get; set; }
    }
}
