import { Request, Response } from "express";
import { parseResponseFromAI } from "../helpers/answerHelpers.mjs";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";
import {
  requestBodySchema,
  responseFromAISchema,
} from "../interfaces/userAnswerSchema.mjs";
import { CustomAuthRequest } from "../interfaces/interfaces";

const postChatCompletion = async (req: CustomAuthRequest, res: Response) => {
  try {
    // check if the request body is valid
    const { content } = requestBodySchema.parse(req.body);

    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(content);

    // JavaScriptオブジェクトに変換
    const parsedResponse = JSON.parse(responseFromAI);

    // check if the response from chatGPT is valid format
    const validatedResponse = responseFromAISchema.parse(parsedResponse);

    const userId = req.userId;
    if (!userId) {
      throw new Error("Failed to get user ID");
    }
    // register the result to MongoDB and get the result ID to return
    const registeredDataId = await registerResult(userId, validatedResponse);

    res.json({ resultId: registeredDataId });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Something broken", error);
  }
};

export default postChatCompletion;
