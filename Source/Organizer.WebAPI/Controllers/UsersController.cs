namespace Organizer.WebAPI.Controllers
{
    using System.Web.Http;

    using Organizer.Data;

    public class UsersController : BaseApiController
    {
        private IOrganizerData data;

        public UsersController() 
            : this(new OrganizerData())
        {
        }

        public UsersController(IOrganizerData data)
            : base(data)
        {
            this.data = data;
        }
    }
}
