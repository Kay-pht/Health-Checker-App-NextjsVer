import { User } from "firebase/auth";
import { fetchHistoryData, fetchResult } from "./api";
import { getToken } from "./firebase";

// MyPage
export const fetchUserHistoryData = async (user: User) => {
  try {
    // const user = auth.currentUser;
    // if (!user) {
    //   console.error("User not found");
    //   throw new Error("User not found");
    // }
    const token = await getToken(user);

    // 過去の診断データをバックエンドから受け取る
    const response = await fetchHistoryData(token);
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// ResultPage
export const fetchUserLatestResult = async (resultId: string,user:User) => {
  try {
    const token = await getToken(user);

    const response = await fetchResult(token, resultId);
    return response;
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
