import { jest } from "@jest/globals";
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
import handleErrors from "./handleErrors.mjs";
import { MongoError } from "mongodb";
import OpenAI from "openai";

describe("handleErrors", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should handle ResultNotFoundError", () => {
    const error = new ResultNotFoundError("Result not found");
    expect(handleErrors(error)).toEqual({
      statusCode: 404,
      body: {
        error: { code: "RESULT_NOT_FOUND", message: "Result not found" },
      },
    });
  });

  it("should handle UnauthorizedAccessError", () => {
    const error = new UnauthorizedAccessError("Unauthorized access");
    expect(handleErrors(error)).toEqual({
      statusCode: 403,
      body: {
        error: {
          code: "UNAUTHORIZED_ACCESS",
          message: "Unauthorized access",
        },
      },
    });
  });

  it("should handle DbDataSchemaError", () => {
    const error = new DbDataSchemaError("Database data schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: 500,
      body: {
        error: {
          code: "DB_DATA_SCHEMA_ERROR",
          message: "Database data schema error",
        },
      },
    });
  });

  it("should handle UserIdSchemaError", () => {
    const error = new UserIdSchemaError("User ID schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: 401,
      body: {
        error: {
          code: "USER_ID_SCHEMA_ERROR",
          message: "User ID schema error",
        },
      },
    });
  });

  it("should handle ResultIdSchemeError", () => {
    const error = new ResultIdSchemeError("Result ID schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: 400,
      body: {
        error: {
          code: "RESULT_ID_SCHEMA_ERROR",
          message: "Result ID schema error",
        },
      },
    });
  });

  it("should handle UserAnswerSchemaError", () => {
    const error = new UserAnswerSchemaError("User answer schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: 400,
      body: {
        error: {
          code: "USER_ANSWER_SCHEMA_ERROR",
          message: "User answer schema error",
        },
      },
    });
  });

  it("should handle ResponseNotFoundError", () => {
    const error = new ResponseNotFoundError("Response not found");
    expect(handleErrors(error)).toEqual({
      statusCode: 404,
      body: {
        error: {
          code: "RESPONSE_NOT_FOUND",
          message: "Response not found",
        },
      },
    });
  });

  it("should handle ResultSchemaError", () => {
    const error = new ResultSchemaError("Result schema error");
    expect(handleErrors(error)).toEqual({
      statusCode: 500,
      body: {
        error: {
          code: "RESULT_SCHEMA_ERROR",
          message: "Result schema error",
        },
      },
    });
  });

  it("should handle MongoError", () => {
    const error = new MongoError("Database error");
    expect(handleErrors(error)).toEqual({
      statusCode: 500,
      body: {
        error: {
          code: "DATABASE_ERROR",
          message: "Database error",
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
      statusCode: 500,
      body: {
        error: {
          code: "OPENAI_API_ERROR",
          message: '500 "OpenAI API error"', // エラーメッセージは元のものを利用
        },
      },
    });
  });

  it("should handle generic Error", () => {
    const error = new Error("Internal server error");
    expect(handleErrors(error)).toEqual({
      statusCode: 500,
      body: {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        },
      },
    });
  });

  it("should handle unknown error", () => {
    const error = "unknown error";
    expect(handleErrors(error)).toEqual({
      statusCode: 500,
      body: {
        error: {
          code: "INTERNAL_SERVER_ERROR",
          message: "Internal server error",
        },
      },
    });
  });
});

//   it("should throw UnauthorizedAccessError with 403 status", () => {
//     const error = new UnauthorizedAccessError("Unauthorized access");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(403);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "UNAUTHORIZED_ACCESS",
//         message: "Unauthorized access",
//       },
//     });
//   });

//   it("should throw DbDataSchemaError with 500 status", () => {
//     const error = new DbDataSchemaError("Database data schema error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "DB_DATA_SCHEMA_ERROR",
//         message: "Database data schema error",
//       },
//     });
//   });

//   it("should throw UserIdSchemaError with 401 status", () => {
//     const error = new UserIdSchemaError("User ID schema error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(401);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "USER_ID_SCHEMA_ERROR",
//         message: "User ID schema error",
//       },
//     });
//   });

//   it("should throw ResultIdSchemeError with 400 status", () => {
//     const error = new ResultIdSchemeError("Result ID schema error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "RESULT_ID_SCHEMA_ERROR",
//         message: "Result ID schema error",
//       },
//     });
//   });

//   it("should throw UserAnswerSchemaError with 400 status", () => {
//     const error = new UserAnswerSchemaError("User answer schema error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(400);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "USER_ANSWER_SCHEMA_ERROR",
//         message: "User answer schema error",
//       },
//     });
//   });

//   it("should throw ResponseNotFoundError with 404 status", () => {
//     const error = new ResponseNotFoundError("Response not found");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "RESPONSE_NOT_FOUND",
//         message: "Response not found",
//       },
//     });
//   });

//   it("should throw ResultSchemaError with 500 status", () => {
//     const error = new ResultSchemaError("Result schema error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "RESULT_SCHEMA_ERROR",
//         message: "Result schema error",
//       },
//     });
//   });

//   it("should throw MongoError with 500 status", () => {
//     const error = new MongoError("Database error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "DATABASE_ERROR",
//         message: "Database error",
//       },
//     });
//   });

//   it("should throw OpenAI.APIError with 500 status", () => {
//     const error = new OpenAI.APIError(
//       500,
//       "OpenAI API error",
//       "OpenAI API error",
//       {}
//     );
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "OPENAI_API_ERROR",
//         message: '500 "OpenAI API error"',
//       },
//     });
//   });

//   it("should throw generic Error with 500 status", () => {
//     const error = new Error("Internal server error");
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "INTERNAL_SERVER_ERROR",
//         message: "Internal server error",
//       },
//     });
//   });

//   it("should throw unknown error with 500 status", () => {
//     const error = "unknown error";
//     handleErrors(error);
//     expect(res.status).toHaveBeenCalledWith(500);
//     expect(res.json).toHaveBeenCalledWith({
//       error: {
//         code: "INTERNAL_SERVER_ERROR",
//         message: "Internal server error",
//       },
//     });
//   });
