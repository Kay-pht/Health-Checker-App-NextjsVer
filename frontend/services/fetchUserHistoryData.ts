import { fetchHistoryData } from "../api/api";
import { getStoredToken } from "./firebase";

const fetchUserHistoryData = async (url: string) => {
  // sessionStorageからトークンを取得
  const token = getStoredToken();

  // 過去の診断データをバックエンドから受け取る
  const response = await fetchHistoryData(url, token);
  return response;
};

export default fetchUserHistoryData;
