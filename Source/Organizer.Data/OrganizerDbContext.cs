 namespace Organizer.Data
{
    using System.Data.Entity;

    using Microsoft.AspNet.Identity.EntityFramework;

    using Organizer.Data.Migrations;
    using Organizer.Models;

    public class OrganizerDbContext : IdentityDbContext<User>
    {
        public OrganizerDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<OrganizerDbContext, Configuration>());
        }

        public IDbSet<OrganizerTask> Tasks { get; set; } 

        public static OrganizerDbContext Create()
        {
            return new OrganizerDbContext();
        }
    }
}