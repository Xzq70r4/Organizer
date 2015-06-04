namespace Organizer.WebAPI.Controllers
{
    using System;
    using System.Linq;
    using System.Web.Http;

    using AutoMapper;
    using AutoMapper.QueryableExtensions;

    using Microsoft.AspNet.Identity;

    using Organizer.Data;
    using Organizer.Models;
    using Organizer.WebAPI.Models;

    public class OrganizerTasksController : BaseApiController
    {
        private IOrganizerData data;

        public OrganizerTasksController() 
            :this(new OrganizerData())
        {
        }

        public OrganizerTasksController(IOrganizerData data)
            : base(data)
        {
            this.data = data;
        }

        // GET: api/OrganizerTasks/Get
        public IHttpActionResult Get()
        {
            var currentUserId = this.User.Identity.GetUserId();
            try
            {
                var tasks = data.OrganizerTasks
                                .All()
                                .Where(t => t.UserId == currentUserId &&
                                            t.ReleaseTime > DateTime.Now)
                                .Project()
                                .To<OrganizerTaskBindingModel>()
                                .ToList();

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // GET: api/OrganizerTasks/Get/5
        public IHttpActionResult Get(Guid id)
        {
            var currentUserId = this.User.Identity.GetUserId();

            try
            {
                var task =this.data.OrganizerTasks
                                   .All().Where(t => t.UserId == currentUserId &&
                                                t.Id == id &&
                                                t.ReleaseTime > DateTime.Now)
                                   .FirstOrDefault();

                if (task == null)
                {
                    return NotFound();
                }

                return Ok(task);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/OrganizerTask/Post
        public IHttpActionResult Post([FromBody]OrganizerTaskBindingModel model)
        {
            var currentUserId = this.User.Identity.GetUserId();

            if (model.ReleaseTime <= DateTime.Now)
            {
                return this.BadRequest("\"RealiseTime\" should be in the future!");
            }


            try
            {
                if (model == null)
                {
                    return BadRequest("Task cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var dbTask = Mapper.Map<OrganizerTask>(model);
                this.data.OrganizerTasks.Add(dbTask);
                this.data.SaveChanges();
                if (dbTask == null)
                {
                    return Conflict();
                }

                return this.Get(dbTask.Id);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // PUT: api/OrganizerTasks/Put/5
        public IHttpActionResult Put(Guid id, [FromBody]OrganizerTaskBindingModel model)
        {
            var currentUserId = this.User.Identity.GetUserId();

            try
            {
                if (model == null)
                {
                    return BadRequest("Task cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (model.ReleaseTime <= DateTime.Now)
                {
                    return this.BadRequest("\"RealiseTime\" should be in the future!");
                }

                var dbTask = Mapper.Map<OrganizerTask>(model);

                if (dbTask.UserId == currentUserId)
                {
                    this.data.OrganizerTasks.Update(dbTask);
                    this.data.SaveChanges();
                }

                if (dbTask == null)
                {
                    return NotFound();
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // DELETE: api/Products/5
        public void Delete(Guid id)
        {
            var currentUserId = this.User.Identity.GetUserId();

            var task = this.data.OrganizerTasks
                                .All()
                                .Where(t => t.Id == id &&
                                            t.UserId == currentUserId)
                                .FirstOrDefault();
            if (task != null)
            {
                this.data.OrganizerTasks.Delete(id);
            }
        }
    }
}
