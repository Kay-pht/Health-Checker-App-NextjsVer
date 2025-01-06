import { Response } from "express";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";

import { CustomAuthRequest } from "../interfaces/interfaces";
import { userAnswerSchema } from "../schemas/userAnswerSchema.mjs";
import { analyzedResultSchema } from "../schemas/analyzedResultSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import OpenAI from "openai";
import userIdSchema from "../schemas/userIdSchema.mjs";

// TODO:identify error status code
const postChatCompletion = async (
  req: CustomAuthRequest,
  res: Response,
  openai: OpenAI
) => {
  try {
    // check if the request body is valid
    const { content } = userAnswerSchema.parse(req.body);

    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(openai, content);
    const parsedResponse = JSON.parse(responseFromAI);

    // check if the response from chatGPT is valid format
    const validatedResponse = analyzedResultSchema.parse(parsedResponse);
    const userId = userIdSchema.parse(req.userId);

    const registeredDataId = await registerResult(
      userId,
      validatedResponse,
      resultsCollection
    );

    res.json({ resultId: registeredDataId });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Something broken", error);
  }
};

export default postChatCompletion;
