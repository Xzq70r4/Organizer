namespace Organizer.WebAPI.Models
{
    using System;

    using AutoMapper;

    using Organizer.Models;
    using Organizer.WebAPI.Infrastructure.Mapping;

    public class EditOrganizerTaskBindingModel
    {
        public Guid Id { get; set; }

        public string UserId { get; set; }

        public string Location { get; set; }

        public Priority Priority { get; set; }

        public string Description { get; set; }

        public string ReleaseTime { get; set; }
    }
}