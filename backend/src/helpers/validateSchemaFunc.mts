import userHistoryDataListSchema from "../schemas/userHistoryDataListSchema.mjs";
import { answerByChatGPTType, Result } from "../interfaces/interfaces";
import {
  DbDataSchemaError,
  ResultIdSchemeError,
  ResultSchemaError,
  UserAnswerSchemaError,
  UserIdSchemaError,
} from "../errors/customErrors.mjs";
import userIdSchema from "../schemas/utilSchemas.mjs";
import { objectResultIdSchema } from "../schemas/resultIdSchema.mjs";
import { analyzedResultSchema } from "../schemas/analyzedResultSchema.mjs";
import { z, ZodError } from "zod";
import { userAnswerSchema } from "../schemas/userAnswerSchema.mjs";
import envSchema, { envSchemaType } from "../schemas/envSchema.mjs";

// Validate environment variables and if they are not correct, exit the process
export const validateEnv = (config: {}): envSchemaType => {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Invalid environment variables: error.errors");
      // error.errors を一つずつ出力する
    } else {
      console.error("Unexpected error:", error);
    }
    process.exit(1);
  }
};

export const validateHistoryDataList = (results: Result[]) => {
  try {
    return userHistoryDataListSchema.parse(results);
  } catch (error) {
    console.error("Failed to validate history data", error);
    if (error instanceof ZodError) {
      throw new DbDataSchemaError("The data is not in the correct format");
    } else {
      throw error;
    }
  }
};

export const validateUserId = (userId: string | undefined) => {
  try {
    return userIdSchema.parse(userId);
  } catch (error) {
    console.error("Failed to validate userId", error);
    if (error instanceof ZodError) {
      throw new UserIdSchemaError("Invalid userId");
    } else {
      throw error;
    }
  }
};

export const validateResultId = (resultId: string) => {
  try {
    return objectResultIdSchema.parse(resultId);
  } catch (error) {
    console.error("Failed to validate resultId", error);
    if (error instanceof ZodError) {
      throw new ResultIdSchemeError("Invalid resultId");
    } else {
      throw error;
    }
  }
};

export const validateAnalyzedData = (result: Result) => {
  try {
    return analyzedResultSchema.parse(result);
  } catch (error) {
    console.error("Failed to validate result", error);
    if (error instanceof ZodError) {
      throw new DbDataSchemaError("The data is not in the correct format");
    } else {
      throw error;
    }
  }
};

export const validateUserAnswer = (userAnswer: Record<string, string>) => {
  try {
    return userAnswerSchema.parse(userAnswer);
  } catch (error) {
    console.error("Failed to validate userAnswer", error);
    if (error instanceof ZodError) {
      throw new UserAnswerSchemaError(
        "The answer is not in the correct format"
      );
    } else {
      throw error;
    }
  }
};

export const validateAnalyzedResult = (result: answerByChatGPTType) => {
  try {
    return analyzedResultSchema.parse(result);
  } catch (error) {
    console.error("Failed to validate result", error);
    if (error instanceof ZodError) {
      throw new ResultSchemaError("The data is not in the correct format");
    } else {
      throw error;
    }
  }
};
