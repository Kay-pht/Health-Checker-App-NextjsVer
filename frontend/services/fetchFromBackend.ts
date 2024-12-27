import { User } from "firebase/auth";
import { fetchHistoryData, fetchResult } from "./api";
import { getToken } from "./firebase";
import { resultIdSchema } from "@/schemas/resultIdSchema";
import { analyzedResultSchema } from "@/schemas/analyzedResultSchema";
import userHistoryDataListSchema from "@/schemas/userHistoryDataListSchema";

// MyPage
export const fetchUserHistoryData = async (user: User) => {
  try {
    const token = await getToken(user);

    // 過去の診断データをバックエンドから受け取る
    const response = await fetchHistoryData(token);
    const validatedResponse = userHistoryDataListSchema.parse(response);

    return validatedResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// ResultPage
export const fetchUserLatestResult = async (resultId: string, user: User) => {
  try {
    const token = await getToken(user);

    const validatedResultId = resultIdSchema.parse(resultId);

    const response = await fetchResult(token, validatedResultId);
    const validatedResponse = analyzedResultSchema.parse(response);
    return validatedResponse;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
