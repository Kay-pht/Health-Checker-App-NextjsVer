import { cookies } from "next/headers";
import { fetchHistoryData, fetchResult } from "./api";

// import { getStoredToken } from "./firebase";

// MyPage
export const fetchUserHistoryData = async () => {
  try {
    const token = await getTokenFromCookie();

    // 過去の診断データをバックエンドから受け取る
    const response = await fetchHistoryData(token);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// ResultPage
export const fetchUserLatestResult = async () => {
  try {
    const token = await getTokenFromCookie();

    const response = await fetchResult(token);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Cookieからトークンを取り出す関数
export const getTokenFromCookie = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    console.error("Authentication token not found in cookies");
    throw new Error("Authentication token not found in cookies");
  }
  return token;
};
