import { Response } from "express";
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

// TODO:fix the messages which are written about server internal issues
const handleErrors = (res: Response, error: unknown) => {
  console.error(error);

  if (error instanceof ResultNotFoundError) {
    res.status(404).json({
      error: {
        code: "RESULT_NOT_FOUND",
        message: error.message,
      },
    });
  } else if (error instanceof UnauthorizedAccessError) {
    res.status(403).json({
      error: {
        code: "UNAUTHORIZED_ACCESS",
        message: error.message,
      },
    });
  } else if (error instanceof DbDataSchemaError) {
    res.status(500).json({
      error: {
        code: "DB_DATA_SCHEMA_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof UserIdSchemaError) {
    res.status(401).json({
      error: {
        code: "USER_ID_SCHEMA_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof ResultIdSchemeError) {
    res.status(400).json({
      error: {
        code: "RESULT_ID_SCHEMA_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof UserAnswerSchemaError) {
    res.status(400).json({
      error: {
        code: "USER_ANSWER_SCHEMA_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof ResponseNotFoundError) {
    res.status(404).json({
      error: {
        code: "RESPONSE_NOT_FOUND",
        message: error.message,
      },
    });
  } else if (error instanceof ResultSchemaError) {
    res.status(500).json({
      error: {
        code: "RESULT_SCHEMA_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof MongoError) {
    res.status(500).json({
      error: {
        code: "DATABASE_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof OpenAI.APIError) {
    res.status(500).json({
      error: {
        code: "OPENAI_API_ERROR",
        message: error.message,
      },
    });
  } else if (error instanceof Error) {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      },
    });
  } else {
    res.status(500).json({
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Internal server error",
      },
    });
  }
};

export default handleErrors;
