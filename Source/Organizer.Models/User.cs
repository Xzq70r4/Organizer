namespace Organizer.Models
{
    using System.Collections.Generic;
    using System.Security.Claims;
    using System.Threading.Tasks;

    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;

    public class User : IdentityUser
    {
        private ICollection<OrganizerTask> tasks;

        public User()
        {
            this.tasks = new HashSet<OrganizerTask>();
        }

        public string ImageUrl { get; set; }

        public virtual ICollection<OrganizerTask> Tasks
        {
            get { return this.tasks; }
            set { this.tasks = value; }
        }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);

            // Add custom user claims here
            return userIdentity;
        }
    }
}
