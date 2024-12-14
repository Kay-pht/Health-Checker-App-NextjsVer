import { SendAnswersType } from "../interfaces/interfaces";

// MyPageでユーザーの過去の診断結果をすべて取得する関数
export const fetchHistoryData = async (url: string, token: string) => {
  try {
    // トークンをヘッダーに載せてバックエンドに送付(検証用)
    // レスとしてこれまでの診断データ(from DB)を送ってもらう
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
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
export const fetchResult = async (url: string, token: string) => {
  try {
    // トークンをヘッダーに載せてバックエンドに送付(検証用)
    // レスとしてこれまでの診断データ(from DB)を送ってもらう
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
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

// バックエンドにユーザーの回答を送付して、AIの診断結果をレスとして取得する関数
export const postAnswersFunc = async ({
  token,
  submittedAnswer,
}: SendAnswersType) => {
  // ヘッダーにトークンを付与。バックエンドでの検証用
  try {
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        Authorization: `Bearer:${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submittedAnswer),
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

// 認証完了時にバックエンドに検証用にトークンを送付して、クッキーにトークンをセットする関数
export const verifyToken = async (token: string) => {
  try {
    const response = await fetch("/api/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    if (!response.ok) {
      throw new Error("Failed to verify token");
    }
    return response;
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};
