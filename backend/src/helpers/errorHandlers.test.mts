import {
  ResultNotFoundError,
  UnauthorizedAccessError,
  DbDataSchemaError,
  UserIdSchemaError,
  ResultIdSchemeError,
  UserAnswerSchemaError,
  ResponseNotFoundError,
  ResultSchemaError,
  TokenSchemaError,
} from "../errors/customErrors.mjs";
import handleErrors from "./errorHandlers.mjs";
import { MongoError } from "mongodb";
import OpenAI from "openai";
import ERROR_MESSAGES from "../errors/errorMessages.mjs";

describe("handleErrors", () => {
  it("should handle ResultNotFoundError", () => {
    const error = new ResultNotFoundError("Result not found");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.RESULT_NOT_FOUND.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.RESULT_NOT_FOUND.code,
          message: ERROR_MESSAGES.RESULT_NOT_FOUND.message,
        },
      },
    });
  });

  it("should handle UnauthorizedAccessError", () => {
    const error = new UnauthorizedAccessError("Unauthorized access");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.code,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.message,
        },
      },
    });
  });

  it("should handle DbDataSchemaError", () => {
    const error = new DbDataSchemaError("Database data schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.DB_DATA_SCHEMA_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.DB_DATA_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.DB_DATA_SCHEMA_ERROR.message,
        },
      },
    });
  });

  it("should handle UserIdSchemaError", () => {
    const error = new UserIdSchemaError("User ID schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.USER_ID_SCHEMA_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.USER_ID_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.USER_ID_SCHEMA_ERROR.message,
        },
      },
    });
  });

  it("should handle ResultIdSchemeError", () => {
    const error = new ResultIdSchemeError("Result ID schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.RESULT_ID_SCHEMA_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.RESULT_ID_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.RESULT_ID_SCHEMA_ERROR.message,
        },
      },
    });
  });

  it("should handle UserAnswerSchemaError", () => {
    const error = new UserAnswerSchemaError("User answer schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.USER_ANSWER_SCHEMA_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.USER_ANSWER_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.USER_ANSWER_SCHEMA_ERROR.message,
        },
      },
    });
  });

  it("should handle ResponseNotFoundError", () => {
    const error = new ResponseNotFoundError("Response not found");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.RESPONSE_NOT_FOUND.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.RESPONSE_NOT_FOUND.code,
          message: ERROR_MESSAGES.RESPONSE_NOT_FOUND.message,
        },
      },
    });
  });

  it("should handle ResultSchemaError", () => {
    const error = new ResultSchemaError("Result schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.RESULT_SCHEMA_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.RESULT_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.RESULT_SCHEMA_ERROR.message,
        },
      },
    });
  });

  it("should handle MongoError", () => {
    const error = new MongoError("Database error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.DATABASE_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.DATABASE_ERROR.code,
          message: ERROR_MESSAGES.DATABASE_ERROR.message,
        },
      },
    });
  });

  it("should handle OpenAI.APIError", () => {
    const error = new OpenAI.APIError(
      500,
      "OpenAI API error",
      "OpenAI API error",
      {}
    );
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.OPENAI_API_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.OPENAI_API_ERROR.code,
          message: ERROR_MESSAGES.OPENAI_API_ERROR.message,
        },
      },
    });
  });

  it("should handle generic Error", () => {
    const error = new Error("Internal server error");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
        },
      },
    });
  });

  it("should handle unknown error", () => {
    const error = "unknown error";
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
        },
      },
    });
  });

  it("should handle TokenSchemaError", () => {
    const error = new TokenSchemaError("No authorization header found");
    expect(handleErrors(error)).toEqual({
      statusCode: ERROR_MESSAGES.TOKEN_SCHEMA_ERROR.statusCode,
      body: {
        error: {
          code: ERROR_MESSAGES.TOKEN_SCHEMA_ERROR.code,
          message: ERROR_MESSAGES.TOKEN_SCHEMA_ERROR.message,
        },
      },
    });
  });
});
