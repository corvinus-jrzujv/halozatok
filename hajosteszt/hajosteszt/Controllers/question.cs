using hajosteszt.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace hajosteszt.Controllers
{
   // [Route("api/[controller]")]
    [ApiController]
    public class question : ControllerBase
    {
        [HttpGet]
        [Route("questions/count")]
        public int M1()
        {
            HajostesztContext context = new HajostesztContext();
            int kérdésekSzáma = context.Questions.Count();
            return kérdésekSzáma;
        }

    }
}
