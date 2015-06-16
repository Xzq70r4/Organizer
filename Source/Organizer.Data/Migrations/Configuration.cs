namespace Organizer.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.Linq;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

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

        protected override void Seed(OrganizerDbContext context)
        {
            if (context.OraganizerTasks.Any())
            {
                return;
            }

            this.userManager = new UserManager<User>(new UserStore<User>(context));

            this.SeedUsers(context);
            this.SeedOrganizerTasks(context);
        }

        private void SeedUsers(OrganizerDbContext context)
        {
            var user = new User
            {
                UserName = "mava",
            };

            this.userManager.Create(user, "123456");
        }

        private void SeedOrganizerTasks(OrganizerDbContext context)
        {
            var user = context.Users.FirstOrDefault();
            for (int i = 0; i < 10; i++)
            {
                var task = new OrganizerTask
                {
                    Description = "dsadsadsadsadsadadadsa",
                    Priority = Priority.Urgent,
                    Location = "u nas",
                    ReleaseTime = DateTime.Now,
                    UserId = user.Id
                };

                context.OraganizerTasks.Add(task);
                context.SaveChanges();
            }
        }
    }
}
