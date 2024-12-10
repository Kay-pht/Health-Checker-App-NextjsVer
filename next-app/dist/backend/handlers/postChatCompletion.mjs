var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { orderAnswers, parseResponseFromAI, } from "../helpers/answerHelpers.mjs";
import { registerResult } from "../service/mongoDB.mjs";
import { getChatCompletion } from "../service/openAI.mjs";
const postChatCompletion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const answers = req.body.content;
        // リクエストの型チェック&正しく並び替え
        const orderedAnswers = orderAnswers(answers);
        // ChatGPTにユーザーの回答を投げる。診断結果をレスとして受け取る
        const responseFromAI = yield getChatCompletion(orderedAnswers);
        // JavaScriptのオブジェクトに変換してフロントに返却
        const parsedResponse = parseResponseFromAI(responseFromAI);
        res.json(parsedResponse);
        // 診断結果をDBに登録
        yield registerResult(req, parsedResponse);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to generate chat completion" });
        console.error("Something broken", error);
    }
});
export default postChatCompletion;
