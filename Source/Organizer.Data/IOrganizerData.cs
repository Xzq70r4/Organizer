namespace Organizer.Data
{
    using Organizer.Models;

    public interface IOrganizerData
    {
        IRepository<User> Users { get; }

        IRepository<OrganizerTask> OrganizerTasks { get; }

        int SaveChanges();
    }
}