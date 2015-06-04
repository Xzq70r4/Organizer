namespace Organizer.Data.Migrations
{
    using System.Data.Entity.Migrations;

    /// <summary>
    /// The configuration.
    /// </summary>
    internal sealed class Configuration : DbMigrationsConfiguration<OrganizerDbContext>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Configuration"/> class.
        /// </summary>
        public Configuration()
        {
            this.AutomaticMigrationsEnabled = true; 
            //TODO: false in production
            this.AutomaticMigrationDataLossAllowed = true;
        }
    }
}
