import { Collection, ObjectId } from "mongodb";
import type { answerByChatGPTType, Result } from "../interfaces/interfaces.js";

//結果のDB登録(AIからの診断結果を返却するとき)
async function registerResult(
  userId: string,
  answerByChatGPT: answerByChatGPTType,
  resultsCollection: Collection<Result>,
  timestamp: Date = new Date()
) {
  const result: Result = {
    userId: userId,
    recommendedFoods: answerByChatGPT.recommendedFoods,
    missingNutrients: answerByChatGPT.missingNutrients,
    score: answerByChatGPT.score,
    createdAt: timestamp,
  };
  try {
    const registeredData = await resultsCollection.insertOne(result);
    return registeredData.insertedId;
  } catch (error) {
    console.error("Failed to register result", error);
    throw error;
    // if (error instanceof MongoError) {
    //   throw error;
    // } else if (error instanceof Error) {
    //   throw new Error(`Error fetching history: ${error.message}`);
    // } else {
    //   throw new Error("An unknown error occurred.");
    // }
  }
}

// 指定ユーザーの最新の診断結果を1件DBから取得(/resultページ用)
async function getResultById(
  resultId: string,
  userId: string,
  resultsCollection: Collection<Result>
) {
  try {
    const result = await resultsCollection.findOne({
      _id: new ObjectId(resultId),
    });
    if (!result) {
      throw new Error(`No result found for id: ${resultId}`);
    }
    if (result.userId !== userId) {
      throw new Error(
        `Unauthorized access to result: ${resultId} for user ${userId}  (expected: ${result.userId})`
      );
    }
    return result;
  } catch (error) {
    console.error("Failed to fetch a result", error);
    throw error;
    // if (error instanceof MongoError) {
    //   throw error;
    // } else if (error instanceof Error) {
    //   throw new Error(`Error fetching result: ${error.message}`);
    // } else {
    //   throw new Error("An unknown error occurred.");
    // }
  }
}

// 指定ユーザーの全ての診断結果をDBから取得(マイページ用)
async function getUserHistoryById(
  userId: string,
  resultsCollection: Collection<Result>
): Promise<Result[]> {
  try {
    const results = await resultsCollection
      .find({ userId: userId })
      .sort({
        createdAt: -1,
      })
      .limit(20)
      .toArray();
    if (results.length === 0) {
      // ユーザーがまだ診断していない場合は空の配列を返す
      return [];
    }
    return results;
  } catch (error) {
    console.error("Failed to fetch history", error);
    throw error;

    // if (error instanceof Error) {
    //   throw new Error(`Error fetching history: ${error.message}`);
    // } else {
    //   throw new Error("An unknown error occurred.");
    // }
  }
}

export { getUserHistoryById, registerResult, getResultById };
