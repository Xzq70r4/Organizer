namespace Organizer.Models
{
    using System;
    using System.ComponentModel.DataAnnotations;

    public class OrganizerTask
    {
        public OrganizerTask()
        {
            this.Id = Guid.NewGuid();
        }

        [Key]
        public Guid Id { get; set; }

        [Required]
        public string UserId { get; set; }

        public virtual User User { get; set; }

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
        public DateTime ReleaseTime { get; set; }
    }
}