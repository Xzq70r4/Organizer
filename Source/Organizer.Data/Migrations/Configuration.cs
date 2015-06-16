namespace Organizer.Data.Migrations
{
    using System.Data.Entity.Migrations;

    using Microsoft.AspNet.Identity;

    using Organizer.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<OrganizerDbContext>
    {
        private UserManager<User> userManager;
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true; 
            //TODO: false in production
            this.AutomaticMigrationDataLossAllowed = true;
        }
    }
}
