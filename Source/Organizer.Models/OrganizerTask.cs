namespace Organizer.Models
{
    using System;

    public class OrganizerTask
    {
        public OrganizerTask()
        {
            this.Id = Guid.NewGuid();
        }

        public Guid Id { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public string Location { get; set; }

        public Priority Priority { get; set; }

        public string Description { get; set; }

        public DateTime ReleaseTime { get; set; }
    }
}