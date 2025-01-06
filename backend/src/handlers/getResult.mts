import { Response } from "express";
import { getResultById } from "../service/mongoDB.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import { CustomAuthRequest, Result } from "../interfaces/interfaces";
import {
  validateAnalyzedResult,
  validateResultId,
  validateUserId,
} from "../helpers/utils.mjs";
import {
  DbDataError,
  resultIdError,
  ResultNotFoundError,
  UnauthorizedAccessError,
  userIdError,
} from "../errors/customErrors.mjs";
import { MongoError } from "mongodb";

// TODO:identify error status code
const getResult = async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果をDBから取得してフロントに返却
    const userId = validateUserId(req.userId);
    const resultId = validateResultId(req.params.resultId);
    const result = (await getResultById(
      resultId,
      userId,
      resultsCollection
    )) as Result;
    const validatedResult = validateAnalyzedResult(result);

    res.status(200).json(validatedResult);
  } catch (error) {
    console.error("Failed to get results", error);
    if (error instanceof userIdError) {
      res.status(401).json({ error: "Unauthorized", details: error.message });
    } else if (error instanceof resultIdError) {
      res.status(400).json({ error: "Bad Request", details: error.message });
    } else if (error instanceof MongoError) {
      res.status(500).json({ error: "Database Error", details: error.message });
    } else if (error instanceof ResultNotFoundError) {
      res.status(404).json({ error: "Not Found", details: error.message });
    } else if (error instanceof UnauthorizedAccessError) {
      res.status(403).json({ error: "Forbidden", details: error.message });
    } else if (error instanceof DbDataError) {
      res
        .status(500)
        .json({ error: "Database Data Error", details: error.message });
    } else {
      res
        .status(500)
        .json({
          error: "Internal Server Error",
          details: "An unexpected error occurred",
        });
    }
  }
};

export default getResult;
