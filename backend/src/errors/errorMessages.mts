const ERROR_MESSAGES = {
  RESULT_NOT_FOUND: {
    statusCode: 404,
    code: "RESULT_NOT_FOUND",
    message: "Result not found.",
  },
  UNAUTHORIZED_ACCESS: {
    statusCode: 403,
    code: "UNAUTHORIZED_ACCESS",
    message: "Unauthorized access.",
  },
  DB_DATA_SCHEMA_ERROR: {
    statusCode: 500,
    code: "DB_DATA_SCHEMA_ERROR",
    message: "Database data schema is invalid.",
  },
  USER_ID_SCHEMA_ERROR: {
    statusCode: 401,
    code: "USER_ID_SCHEMA_ERROR",
    message: "User ID format is invalid.",
  },
  RESULT_ID_SCHEMA_ERROR: {
    statusCode: 400,
    code: "RESULT_ID_SCHEMA_ERROR",
    message: "Result ID format is invalid.",
  },
  USER_ANSWER_SCHEMA_ERROR: {
    statusCode: 400,
    code: "USER_ANSWER_SCHEMA_ERROR",
    message: "Answer format is invalid.",
  },
  RESPONSE_NOT_FOUND: {
    statusCode: 404,
    code: "RESPONSE_NOT_FOUND",
    message: "Response not found.",
  },
  RESULT_SCHEMA_ERROR: {
    statusCode: 500,
    code: "RESULT_SCHEMA_ERROR",
    message: "Result format is invalid.",
  },
  DATABASE_ERROR: {
    statusCode: 500,
    code: "DATABASE_ERROR",
    message: "A database error occurred.",
  },
  OPENAI_API_ERROR: {
    statusCode: 500,
    code: "OPENAI_API_ERROR",
    message: "An error occurred with the OpenAI API.",
  },
  INTERNAL_SERVER_ERROR: {
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    message: "An internal server error occurred.",
  },
};
export default ERROR_MESSAGES;
