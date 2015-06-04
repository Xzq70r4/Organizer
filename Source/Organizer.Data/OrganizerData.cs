namespace Organizer.Data
{
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;

    using Organizer.Models;

    public class OrganizerData : IOrganizerData
    {
        private readonly DbContext context;

        private readonly IDictionary<Type, object> repositories;

        public OrganizerData()
            : this(new OrganizerDbContext())
        {
        }

        public OrganizerData(DbContext context)
        {
            this.context = context;
            this.repositories = new Dictionary<Type, object>();
        }

        public IRepository<User> Users
        {
            get
            {
                return this.GetRepository<User>();
            }
        }

        public IRepository<OrganizerTask> OrganizerTasks
        {
            get
            {
                return this.GetRepository<OrganizerTask>();
            }
        }

        public int SaveChanges()
        {
            return this.context.SaveChanges();
        }

        private IRepository<T> GetRepository<T>() where T : class
        {
            if (!this.repositories.ContainsKey(typeof(T)))
            {
                var type = typeof(EfRepository<T>);

                this.repositories.Add(typeof(T), Activator.CreateInstance(type, this.context));
            }

            return (IRepository<T>)this.repositories[typeof(T)];
        }
    }
}