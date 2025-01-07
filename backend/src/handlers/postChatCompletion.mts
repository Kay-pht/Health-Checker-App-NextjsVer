import { Response } from "express";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";

import { CustomAuthRequest } from "../interfaces/interfaces";
import { resultsCollection } from "../helpers/connectDB.mjs";
import {
  validateAnalyzedResult,
  validateUserAnswer,
  validateUserId,
} from "../helpers/utils.mjs";
import handleErrors from "../helpers/handleErrors.mjs";

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
    // TODO:resを下位の関数にまで渡してよいのか?
    handleErrors(res, error);
    // if (error instanceof UserAnswerSchemaError) {
    //   res.status(400).json({ error: "Bad Request", details: error.message });
    // } else if (error instanceof DbDataSchemaError) {
    //   res
    //     .status(500)
    //     .json({ error: "Database Data Error", details: error.message });
    // } else if (error instanceof UserIdSchemaError) {
    //   res.status(401).json({ error: "Unauthorized", details: error.message });
    // } else if (error instanceof MongoError) {
    //   res.status(500).json({ error: "Database Error", details: error.message });
    // } else if (error instanceof OpenAI.APIError) {
    //   res.status(500).json({ error: error.name, details: error.message });
    // } else if (error instanceof Error) {
    //   res.status(500).json({
    //     error: "Internal Server Error",
    //     details: error.message,
    //   });
    // } else {
    //   res.status(500).json({
    //     error: "Internal Server Error",
    //     details: "An unexpected error occurred",
    //   });
    // }
    console.error("Something broken", error);
  }
};

export default postChatCompletion;
