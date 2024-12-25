import { Request, Response } from "express";
import {
  orderAnswers,
  parseResponseFromAI,
} from "../helpers/answerHelpers.mjs";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";
import { requestBodySchema } from "../interfaces/userAnswerSchema.mjs";

const postChatCompletion = async (req: Request, res: Response) => {
  try {
    const { content } = requestBodySchema.parse(req.body);
    // リクエストの型チェック&正しく並び替え
    const orderedAnswers = orderAnswers(content);
    // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
    const responseFromAI = await getChatCompletion(orderedAnswers);
    // JavaScriptのオブジェクトに変換してフロントに返却
    const parsedResponse = parseResponseFromAI(responseFromAI);
    // res.json(parsedResponse);

    // 診断結果をDBに登録
    const registeredDataId = await registerResult(req, parsedResponse);
    res.json({ resultId: registeredDataId });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate chat completion" });
    console.error("Something broken", error);
  }
};

export default postChatCompletion;
