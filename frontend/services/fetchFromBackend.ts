import { fetchHistoryData, fetchResult } from "../api/api";
import { getStoredToken } from "./firebase";

// MyPage
export const fetchUserHistoryData = async (url: string) => {
  // sessionStorageからトークンを取得
  const token = getStoredToken();

  // 過去の診断データをバックエンドから受け取る
  const response = await fetchHistoryData(url, token);
  return response;
};

// ResultPage
export const fetchUserLatestResult = async (url: string) => {
  // sessionStorageからトークンを取得
  const token = getStoredToken();

  const response = await fetchResult(url, token);
  return response;
};

