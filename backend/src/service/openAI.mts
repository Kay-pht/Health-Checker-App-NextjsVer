import OpenAI from "openai";
import prompt from "../helpers/prompt.mjs";

// データアクセス(ChatGPTとの連携)部分の実装
async function getChatCompletion(
  openai: OpenAI,
  orderedAnswers: { [key: string]: string }
) {
  try {
    // OpenAIのChatGPTに回答を送付して、返答をレスとして受け取る
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: prompt(orderedAnswers),
    });
    const responseFromAI = completion.choices[0].message.content;
    if (!responseFromAI) {
      console.error("No response from OpenAI");
      throw new Error("No response from OpenAI");
    }
    return responseFromAI;
  } catch (error) {
    console.error("Can't connect to OpenAI", error);
    if (error instanceof Error) {
      throw new Error("Failed to connect to OpenAI: " + error.message);
    } else {
      throw new Error("Failed to connect to OpenAI: An unknown error occurred");
    }
  }
}

export { getChatCompletion };
