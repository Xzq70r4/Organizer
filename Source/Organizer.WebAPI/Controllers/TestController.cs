namespace Organizer.WebAPI.Controllers
{
    using System.Linq;
    using System.Web.Http;

    using Organizer.Data;

    public class TestController : BaseApiController
    {
        private IOrganizerData data;

        public TestController() 
            :this(new OrganizerData())
        {
        }

        public TestController(IOrganizerData data)
            : base(data)
        {
            this.data = data;
        }

        public IHttpActionResult GetAllUsersCount()
        {
            var count = this.data.Users.All().Count();
            return this.Ok();
        }
    }
}
