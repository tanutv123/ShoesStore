using API.Errors;
using Infrastructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	public class BuggyController : BaseController
	{
		private readonly DataContext _context;

		public BuggyController(DataContext context)
        {
			_context = context;
		}
		[HttpGet("test-auth")]
		[Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret";
        }
        [HttpGet("notfound")]
		public ActionResult GetNotFoundRequest()
		{
			return NotFound(new ApiResponse(404));
		}

		[HttpGet("servererror")]
		public ActionResult GetServerErrorRequest()
		{
			var product = _context.Products.Find(42);
			var productToReturn = product.ToString();
			return Ok();
		}

		[HttpGet("badrequest")]
		public ActionResult GetBadRequest()
		{
			return BadRequest(new ApiResponse(400));
		}

		[HttpGet("badrequest/{id}")]
		public ActionResult GetValidationErrorRequest(int id)
		{
			return Ok(new ApiResponse(400));
		}
	}
}
