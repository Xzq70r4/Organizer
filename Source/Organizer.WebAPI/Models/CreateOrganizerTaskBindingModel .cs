namespace Organizer.WebAPI.Models
{
    using System;

    using AutoMapper;

    using Organizer.Models;
    using Organizer.WebAPI.Infrastructure.Mapping;

    public class CreateOrganizerTaskBindingModel
    {

        public string UserId { get; set; }

        public string Location { get; set; }

        public Priority Priority { get; set; }

        public string Description { get; set; }

        public string ReleaseTime { get; set; }
    }
}