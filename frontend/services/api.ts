import { SendAnswersType } from "../interfaces/interfaces";
import { configENV } from "@/config";

// MyPageでユーザーの過去の診断結果をすべて取得する関数
export const fetchHistoryData = async (token: string) => {
  try {
    // トークンをヘッダーに載せてバックエンドに送付(検証用)
    // レスとしてこれまでの診断データ(from DB)を送ってもらう
    const response = await fetch(`${configENV.baseUrl}/api/mypage`, {
      method: "GET",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      cache: "no-cache",
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// ResultPageでユーザーの最新の診断結果を一件取得する関数
export const fetchResult = async (token: string, resultId: string) => {
  try {
    // トークンをヘッダーに載せてバックエンドに送付(検証用)
    // レスとしてこれまでの診断データ(from DB)を送ってもらう
    const response = await fetch(
      `${configENV.baseUrl}/api/result/${resultId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer:${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
        cache: "no-cache",
        next: { revalidate: 0 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// バックエンドにユーザーの回答を送付して、AIの診断結果をレスとして取得する関数
export const postAnswersFunc = async ({
  token,
  validatedUserAnswer,
}: SendAnswersType) => {
  // ヘッダーにトークンを付与。バックエンドでの検証用
  try {
    const response = await fetch(`${configENV.baseUrl}/api/completion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(validatedUserAnswer),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch data from the server");
    }
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 認証完了時にバックエンドに検証用にトークンを送付して、クッキーにトークンをセットする関数。トークンはヘッダーに添付し、ボディを空にするのでGETメソッドを採用
export const verifyToken = async (token: string) => {
  try {
    const response = await fetch(`${configENV.baseUrl}/api/auth`, {
      method: "GET",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("Failed to verify token");
    }
    console.log("Token verified successfully.");
    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw new Error("Failed to verify token");
  }
};
