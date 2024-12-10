var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import OpenAI from "openai";
import prompt from "../helpers/prompt.mjs";
import configEnv from "../configEnv.mjs";
const openai = new OpenAI({
    apiKey: configEnv.openaiApiKey,
});
// データアクセス(ChatGPTとの連携)部分の実装
function getChatCompletion(orderedAnswers) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // OpenAIのChatGPTに回答を送付して、返答をレスとして受け取る
            const completion = yield openai.chat.completions.create({
                model: "gpt-4o-mini",
                temperature: 0,
                messages: prompt(orderedAnswers),
            });
            const responseFromAI = completion.choices[0].message.content;
            if (responseFromAI) {
                return responseFromAI;
            }
            else {
                console.error("Invalid response from OpenAI");
                throw new Error("Invalid response format from OpenAI");
            }
        }
        catch (error) {
            console.error("Can't connect to OpenAI", error);
            if (error instanceof Error) {
                throw new Error("Failed to connect to OpenAI: " + error.message);
            }
            else {
                throw new Error("Failed to connect to OpenAI: An unknown error occurred");
            }
        }
    });
}
export { getChatCompletion };
