import OpenAI from "openai";
import { UserAnswer } from "../schemas/userAnswerSchema.mjs";
import { prompt } from "../helpers/utils.mjs";
import configEnv from "../configEnv.mjs";
import { ResponseNotFoundError } from "../errors/customErrors.mjs";

// データアクセス(ChatGPTとの連携)部分の実装
async function getChatCompletion(
  openai: OpenAI,
  orderedAnswers: UserAnswer["content"]
) {
  try {
    // OpenAIのChatGPTに回答を送付して、返答をレスとして受け取る
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: prompt(
        orderedAnswers,
        configEnv.rolePrompt,
        configEnv.taskPrompt
      ),
    });
    const responseFromAI = completion.choices[0].message.content;
    if (!responseFromAI) {
      console.error("No response from OpenAI");
      throw new ResponseNotFoundError("No response from OpenAI");
    }
    return responseFromAI;
  } catch (error) {
    console.error("Can't connect to OpenAI", error);
throw error
  }
}

export { getChatCompletion };
