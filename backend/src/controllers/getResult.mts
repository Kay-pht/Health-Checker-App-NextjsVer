import { Response } from "express";
import { getResultById } from "../service/mongoDB.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import { CustomAuthRequest, Result } from "../interfaces/interfaces";
import {} from "../helpers/utils.mjs";
import handleErrors from "../helpers/errorHandlers.mjs";
import {
  validateAnalyzedData,
  validateResultId,
  validateUserId,
} from "../helpers/validateSchemaFunc.mjs";

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
    const validatedResult = validateAnalyzedData(result);

    res.status(200).json(validatedResult);
  } catch (error) {
    // possible errors are below:
    // - UserIdSchemaError (401 Unauthorized)
    // - ResultIdSchemeError (400 Bad Request)
    // - ResultNotFoundError (404 Not Found)
    // - UnauthorizedAccessError (403 Forbidden)
    // - MongoError (500 Internal Server Error)
    // - DbDataSchemaError (500 Internal Server Error)
    // - Generic Error (500 Internal Server Error)
    const { statusCode, body } = handleErrors(error);
    res.status(statusCode).json(body);
    console.error("Failed to get a result", error);
  }
};

export default getResult;
