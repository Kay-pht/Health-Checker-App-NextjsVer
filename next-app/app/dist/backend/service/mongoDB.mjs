var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { resultsCollection } from "../helpers/connectDB.mjs";
//結果のDB登録(AIからの診断結果を返却するとき)
function registerResult(req, answerByChatGPT) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const errors = validationResult(req);
        //   if (!errors.isEmpty()) {
        //     const errs = errors.array();
        //     return res.status(400).json({ errors: errs });
        //   }
        const timestamp = new Date();
        const result = {
            userId: req.userId,
            recommendedFoods: answerByChatGPT.recommendedFoods,
            missingNutrients: answerByChatGPT.missingNutrients,
            score: answerByChatGPT.score,
            createdAt: timestamp,
        };
        try {
            yield resultsCollection.insertOne(result);
        }
        catch (error) {
            console.error("Failed to register result", error);
            throw new Error("Failed to save result");
        }
    });
}
// 結果をMongoDBから取得(マイページ表示用)
function getResultsByUserId(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield resultsCollection
                .find({ userId: req.userId })
                .sort({
                createdAt: -1,
            })
                .toArray();
            if (results.length === 0) {
                return [];
            }
            return results;
        }
        catch (error) {
            console.error("Failed to get results with user ID", error);
            throw new Error("Failed to fetch results from DB");
        }
    });
}
export { getResultsByUserId, registerResult };
