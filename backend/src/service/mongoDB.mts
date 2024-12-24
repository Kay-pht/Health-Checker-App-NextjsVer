import { ObjectId } from "mongodb";
import { resultsCollection } from "../helpers/connectDB.mjs";
import type {
  answerByChatGPTType,
  CustomAuthRequest,
  Result,
} from "../interfaces/interfaces.js";

//結果のDB登録(AIからの診断結果を返却するとき)
async function registerResult(
  req: CustomAuthRequest,
  answerByChatGPT: answerByChatGPTType,
  timestamp: Date = new Date()
) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const errs = errors.array();
  //     return res.status(400).json({ errors: errs });
  //   }

  const result: Result = {
    userId: req.userId,
    recommendedFoods: answerByChatGPT.recommendedFoods,
    missingNutrients: answerByChatGPT.missingNutrients,
    score: answerByChatGPT.score,
    createdAt: timestamp,
  };
  try {
    const registeredData = await resultsCollection.insertOne(result);
    if (!registeredData) {
      throw new Error("Failed to save result");
    }
    return registeredData.insertedId;
  } catch (error) {
    console.error("Failed to register result", error);
    throw new Error("Failed to save result");
  }
}

// 指定ユーザーの全ての診断結果をDBから取得(マイページ用)
async function getUserHistoryById(req: CustomAuthRequest) {
  try {
    const results = await resultsCollection
      .find({ userId: req.userId })
      .sort({
        createdAt: -1,
      })
      .limit(20)
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
// 指定ユーザーの最新の診断結果を1件DBから取得(/resultページ用)
async function getResultById(resultId: string) {
  try {
    const result = await resultsCollection.findOne({
      _id: new ObjectId(resultId),
    });
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
