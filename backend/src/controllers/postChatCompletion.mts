import { Response } from "express";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";

import { CustomAuthRequest } from "../interfaces/interfaces";
import { resultsCollection } from "../helpers/connectDB.mjs";
import handleErrors from "../helpers/errorHandlers.mjs";
import {
  validateAnalyzedResult,
  validateUserAnswer,
  validateUserId,
} from "../helpers/validateSchemaFunc.mjs";

const postChatCompletion = async (req: CustomAuthRequest, res: Response) => {
  try {
    const { content } = validateUserAnswer(req.body);

    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(content);
    const parsedResponse = JSON.parse(responseFromAI);

    // check if the response from chatGPT is valid format
    const validatedResponse = validateAnalyzedResult(parsedResponse);
    const userId = validateUserId(req.userId);

    const registeredDataId = await registerResult(
      userId,
      validatedResponse,
      resultsCollection
    );

    res.json({ resultId: registeredDataId });
  } catch (error) {
    // possible errors are below:
    // - UserAnswerSchemaError (400 Bad Request)
    // - DbDataSchemaError (500 Internal Server Error)
    // - UserIdSchemaError (401 Unauthorized)
    // - MongoError (500 Internal Server Error)
    // - OpenAI.APIError (500 Internal Server Error)
    // - Generic Error (500 Internal Server Error)
    const { statusCode, body } = handleErrors(error);
    res.status(statusCode).json(body);
    console.error("fail to analyze", error);
  }
};

export default postChatCompletion;
