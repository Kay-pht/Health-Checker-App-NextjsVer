import { fetchHistoryData, fetchResult } from "./api";
import { resultIdSchema } from "@/schemas/resultIdSchema";
import { analyzedResultSchema } from "@/schemas/analyzedResultSchema";
import userHistoryDataListSchema from "@/schemas/userHistoryDataListSchema";

// MyPage
export const fetchUserHistoryData = async (token: string) => {
  // 過去の診断データをバックエンドから受け取る
  const response = await fetchHistoryData(token);
  const validatedResponse = userHistoryDataListSchema.parse(response);

  return validatedResponse;
};

// ResultPage
export const fetchUserLatestResult = async (
  resultId: string,
  token: string
) => {
  const validatedResultId = resultIdSchema.parse(resultId);

  const response = await fetchResult(token, validatedResultId);
  const validatedResponse = analyzedResultSchema.parse(response);
  return validatedResponse;
};

//post
