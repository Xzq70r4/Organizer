namespace Organizer.WebAPI.Controllers
{
    using System.Web.Http;

    using Organizer.Data;

    public class BaseApiController : ApiController
    {
        public BaseApiController(IOrganizerData data)
        {
            this.Data = data;
        }

        protected IOrganizerData Data { get; private set; }
    }
}
