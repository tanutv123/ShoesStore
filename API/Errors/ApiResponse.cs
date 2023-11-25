namespace API.Errors
{
	public class ApiResponse
	{
        public ApiResponse()
        {
            
        }
        public ApiResponse(int statusCode, string message = null)
		{
			StatusCode = statusCode;
			Message = message ?? GetDefaultMessageForStatusCode(statusCode);
		}

		public int StatusCode { get; set; }
        public string Message { get; set; }

		private string GetDefaultMessageForStatusCode(int statusCode)
		{
			return statusCode switch
			{
				400 => "A bad request was sent to the server",
				401 => "You are not authorized to do the action",
				404 => "Resource not found",
				500 => "Errors occured on server side",
				_ => null
			};
		}
	}
}
