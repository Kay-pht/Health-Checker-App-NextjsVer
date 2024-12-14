import { resultsCollection } from "../helpers/connectDB.mjs";
import type {
  answerByChatGPTType,
  CustomAuthRequest,
  Result,
} from "../interfaces/interfaces.js";

//結果のDB登録(AIからの診断結果を返却するとき)
async function registerResult(
  req: CustomAuthRequest,
  answerByChatGPT: answerByChatGPTType
) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const errs = errors.array();
  //     return res.status(400).json({ errors: errs });
  //   }
  const timestamp = new Date();
  const result: Result = {
    userId: req.userId,
    recommendedFoods: answerByChatGPT.recommendedFoods,
    missingNutrients: answerByChatGPT.missingNutrients,
    score: answerByChatGPT.score,
    createdAt: timestamp,
  };
  try {
    await resultsCollection.insertOne(result);
  } catch (error) {
    console.error("Failed to register result", error);
    throw new Error("Failed to save result");
  }
}

// 指定ユーザーの全ての診断結果を全てDBから取得(マイページ用)
async function getUserHistoryById(req: CustomAuthRequest) {
  try {
    const results = await resultsCollection
      .find({ userId: req.userId })
      .sort({
        createdAt: -1,
      })
      .toArray();
    if (results.length === 0) {
      return [];
    }
    return results;
  } catch (error) {
    console.error("Failed to get results with user ID", error);
    throw new Error("Failed to fetch results from DB");
  }
}
// 指定ユーザーの最新の診断結果を1件DBから取得(結果表示ページ用)
async function getResultById(req: CustomAuthRequest) {
  try {
    const result = await resultsCollection.findOne(
      { userId: req.userId },
      { sort: { createdAt: -1 } }
    );

    if (!result) {
      throw new Error("Failed to fetch result from DB");
    }
    return result;
  } catch (error) {
    console.error("Failed to get result with user ID", error);
    throw new Error("Failed to fetch result from DB");
  }
}

export { getUserHistoryById, registerResult, getResultById };
