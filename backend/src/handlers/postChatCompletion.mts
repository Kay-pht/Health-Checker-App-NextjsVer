import { Response } from "express";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";

import { CustomAuthRequest } from "../interfaces/interfaces";
import { userAnswerSchema } from "../schemas/userAnswerSchema.mjs";
import { analyzedResultSchema } from "../schemas/analyzedResultSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";

const postChatCompletion = async (req: CustomAuthRequest, res: Response) => {
  try {
    // check if the request body is valid
    const { content } = userAnswerSchema.parse(req.body);

    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(content);

    // JavaScriptオブジェクトに変換
    const parsedResponse = JSON.parse(responseFromAI);

    // check if the response from chatGPT is valid format
    const validatedResponse = analyzedResultSchema.parse(parsedResponse);

    const userId = req.userId;
    if (!userId) {
      throw new Error("Failed to get user ID");
    }
    // register the result to MongoDB and get the result ID to return
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
