import { Collection, ObjectId } from "mongodb";
import type { answerByChatGPTType, Result } from "../interfaces/interfaces.js";

//結果のDB登録(AIからの診断結果を返却するとき)
async function registerResult(
  userId: string,
  answerByChatGPT: answerByChatGPTType,
  resultsCollection: Collection<Result>,
  timestamp: Date = new Date()
) {
  //   const errors = validationResult(req);
  //   if (!errors.isEmpty()) {
  //     const errs = errors.array();
  //     return res.status(400).json({ errors: errs });
  //   }

  const result: Result = {
    userId: userId,
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
async function getUserHistoryById(
  userId: string,
  resultsCollection: Collection<Result>
) {
  try {
    const results = await resultsCollection
      .find({ userId: userId })
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
async function getResultById(
  resultId: string,
  resultsCollection: Collection<Result>
) {
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
