import {
  ResultNotFoundError,
  UnauthorizedAccessError,
  DbDataSchemaError,
  UserIdSchemaError,
  ResultIdSchemeError,
  UserAnswerSchemaError,
  ResponseNotFoundError,
  ResultSchemaError,
} from "../errors/customErrors.mjs";
import { MongoError } from "mongodb";
import OpenAI from "openai";
import ERROR_MESSAGES from "../errors/errorMessages.mjs";

// TODO:fix the messages which contains internal issues
const handleErrors = (
  error: unknown
): {
  statusCode: number;
  body: { error: { code: string; message: string } };
} => {
  console.error(error);

  if (error instanceof ResultNotFoundError) {
    return {
      statusCode: 404,
      body: {
        error: {
          code: ERROR_MESSAGES.RESULT_NOT_FOUND.code,
          message: ERROR_MESSAGES.RESULT_NOT_FOUND.message,
        },
      },
    };
  } else if (error instanceof UnauthorizedAccessError) {
    return {
      statusCode: 403,
      body: {
        error: {
          code: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.code,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.message,
        },
      },
    };
  } else if (error instanceof DbDataSchemaError) {
    return {
      statusCode: 500,
      body: {
        error: {
          code: ERROR_MESSAGES.DB_DATA_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.DB_DATA_SCHEMA_ERROR.message,
        },
      },
    };
  } else if (error instanceof UserIdSchemaError) {
    return {
      statusCode: 401,
      body: {
        error: {
          code: ERROR_MESSAGES.USER_ID_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.USER_ID_SCHEMA_ERROR.message,
        },
      },
    };
  } else if (error instanceof ResultIdSchemeError) {
    return {
      statusCode: 400,
      body: {
        error: {
          code: ERROR_MESSAGES.RESULT_ID_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.RESULT_ID_SCHEMA_ERROR.message,
        },
      },
    };
  } else if (error instanceof UserAnswerSchemaError) {
    return {
      statusCode: 400,
      body: {
        error: {
          code: ERROR_MESSAGES.USER_ANSWER_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.USER_ANSWER_SCHEMA_ERROR.message,
        },
      },
    };
  } else if (error instanceof ResponseNotFoundError) {
    return {
      statusCode: 404,
      body: {
        error: {
          code: ERROR_MESSAGES.RESPONSE_NOT_FOUND.code,
          message: ERROR_MESSAGES.RESPONSE_NOT_FOUND.message,
        },
      },
    };
  } else if (error instanceof ResultSchemaError) {
    return {
      statusCode: 500,
      body: {
        error: {
          code: ERROR_MESSAGES.RESULT_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.RESULT_SCHEMA_ERROR.message,
        },
      },
    };
  } else if (error instanceof MongoError) {
    return {
      statusCode: 500,
      body: {
        error: {
          code: ERROR_MESSAGES.DATABASE_ERROR.code,
          message: ERROR_MESSAGES.DATABASE_ERROR.message,
        },
      },
    };
  } else if (error instanceof OpenAI.APIError) {
    return {
      statusCode: 500,
      body: {
        error: {
          code: ERROR_MESSAGES.OPENAI_API_ERROR.code,
          message: ERROR_MESSAGES.OPENAI_API_ERROR.message,
        },
      },
    };
  } else if (error instanceof Error) {
    return {
      statusCode: 500,
      body: {
        error: {
          code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
          message: error.message,
        },
      },
    };
  } else {
    return {
      statusCode: 500,
      body: {
        error: {
          code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
        },
      },
    };
  }
};

export default handleErrors;
