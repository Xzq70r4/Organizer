﻿namespace Organizer.WebAPI.Controllers
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

    [Authorize]
    public class OrganizerTasksController : BaseApiController
    {
        private IOrganizerData data;

        public OrganizerTasksController()
            : this(new OrganizerData())
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
                var tasks = this.data.OrganizerTasks
                                .All()
                                .Where(t => t.UserId == currentUserId)
                                .Project()
                                .To<OrganizerTaskBindingModel>()
                                .ToList();

                return this.Ok(tasks);
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        // GET: api/OrganizerTasks/Get/21A1A104-4D25-4D90-8241-12F8A995BF86
        public IHttpActionResult Get(string id)
        {
            var currentUserId = this.User.Identity.GetUserId();
            var taskId = new Guid(id);
            try
            {
                var task = this.data.OrganizerTasks
                                   .All()
                                   .Where(t => t.UserId == currentUserId &&
                                               t.Id == taskId)
                                   .Project()
                                   .To<OrganizerTaskBindingModel>()
                                   .FirstOrDefault();

                if (task == null)
                {
                    return this.NotFound();
                }

                return this.Ok(task);
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        // POST: api/OrganizerTask/Post
        public IHttpActionResult Post(CreateOrganizerTaskBindingModel model)
        {
            var currentUserId = this.User.Identity.GetUserId();
            var oraganizerTaskReleaseTime = ConvertStringToDateTime(model.ReleaseTime);
            if (oraganizerTaskReleaseTime <= DateTime.Now)
            {
                return this.BadRequest("\"Realise Time\" should be in the future!");
            }


            try
            {
                if (model == null)
                {
                    return this.BadRequest("Task cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return this.BadRequest(ModelState);
                }

                var dbTask = new OrganizerTask
                {
                    UserId = currentUserId,
                    Location = model.Location,
                    Description = model.Description,
                    Priority = model.Priority,
                    ReleaseTime = oraganizerTaskReleaseTime
                };

                this.data.OrganizerTasks.Add(dbTask);
                this.data.SaveChanges();
                if (dbTask == null)
                {
                    return this.Conflict();
                }

                return this.Ok();
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        // PUT: api/OrganizerTasks/Put/21A1A104-4D25-4D90-8241-12F8A995BF86
        public IHttpActionResult Put(Guid id, EditOrganizerTaskBindingModel model)
        {
            var currentUserId = this.User.Identity.GetUserId();
            var oraganizerTaskReleaseTime = ConvertStringToDateTime(model.ReleaseTime);

            try
            {
                if (model == null)
                {
                    return this.BadRequest("Task cannot be null");
                }

                if (!ModelState.IsValid)
                {
                    return this.BadRequest(ModelState);
                }

                if (oraganizerTaskReleaseTime <= DateTime.Now)
                {
                    return this.BadRequest("\"RealiseTime\" should be in the future!");
                }

                

                if (model.UserId == currentUserId)
                {
                    var dbTask = new OrganizerTask
                    {
                        Id = model.Id,
                        UserId = model.UserId,
                        Location = model.Location,
                        Description = model.Description,
                        Priority = model.Priority,
                        ReleaseTime = oraganizerTaskReleaseTime
                    };

                    if (dbTask == null)
                    {
                        return this.NotFound();
                    }

                    this.data.OrganizerTasks.Update(dbTask);
                    this.data.SaveChanges();
                }

                if (model.UserId != currentUserId)
                {
                    return this.BadRequest("This task is not your !");
                }

                return this.Ok();
            }
            catch (Exception ex)
            {
                return this.InternalServerError(ex);
            }
        }

        // DELETE: api/OrganizerTasks/21A1A104-4D25-4D90-8241-12F8A995BF865
        //TODO:fix this
        public void Delete(Guid id)
        {
            var currentUserId = this.User.Identity.GetUserId();
            var organizerTask = this.data.OrganizerTasks.GetById(id);

            if (organizerTask != null &&
                organizerTask.UserId == currentUserId)
            {
                this.data.OrganizerTasks.Delete(id);
                this.data.SaveChanges();
            }
        }

        [NonAction]
        private static DateTime ConvertStringToDateTime(string stringDateTime)
        {
            string[] datetimeArr = stringDateTime.Split(new char[] { ' ', '/', ':' });

            var releaseTime = new DateTime(
                Int32.Parse(datetimeArr[0]),
                Int32.Parse(datetimeArr[1]),
                Int32.Parse(datetimeArr[2]),
                Int32.Parse(datetimeArr[3]),
                Int32.Parse(datetimeArr[4]),
                Int32.Parse(datetimeArr[5]));

            return releaseTime;
        }
    }
}
