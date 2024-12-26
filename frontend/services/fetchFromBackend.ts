import { User } from "firebase/auth";
import { fetchHistoryData, fetchResult } from "./api";
import { getToken } from "./firebase";
import { resultIdSchema } from "@/schemas/resultIdSchema";
import { analyzedResultSchema } from "@/schemas/analyzedResultSchema";

// MyPage
export const fetchUserHistoryData = async (user: User) => {
  try {
    const token = await getToken(user);

    // 過去の診断データをバックエンドから受け取る
    const response = await fetchHistoryData(token);
    // TODO:validate response with zod
    return response;
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

// Cookieからトークンを取り出す関数
// export const getTokenFromCookie = async () => {
//   const cookieStore = await cookies();

//   const token = cookieStore.get("authToken")?.value;

//   if (!token) {
//     console.error("Authentication token not found in cookies");
//     throw new Error("Authentication token not found in cookies");
//   }
//   return token;
// };
