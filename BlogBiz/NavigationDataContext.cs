namespace BlogBiz
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class NavigationDataContext : DbContext
    {
        public NavigationDataContext()
            : base("name=NavigationDataContext")
        {
        }

        public virtual DbSet<Nav_Category> Nav_Category { get; set; }
        public virtual DbSet<Nav_Site> Nav_Site { get; set; }
        public virtual DbSet<Blog_User> Blog_User { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
        }
    }
}
