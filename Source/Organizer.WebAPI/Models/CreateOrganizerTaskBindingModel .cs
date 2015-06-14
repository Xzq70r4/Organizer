namespace Organizer.WebAPI.Models
{
    using System.ComponentModel.DataAnnotations;


    using Organizer.Models;

    public class CreateOrganizerTaskBindingModel
    {
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string Location { get; set; }

        [Required]
        public Priority Priority { get; set; }

        [Required]
        [MinLength(5)]
        [MaxLength(500)]
        public string Description { get; set; }

        [Required]
        public string ReleaseTime { get; set; }
    }
}