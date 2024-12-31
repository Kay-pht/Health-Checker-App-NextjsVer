import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import type { CustomAuthRequest } from "../interfaces/interfaces.js";

// クライアントから送られてきたトークンの検証
export const verifyTokenMiddleware = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  try {
    const idToken = getTokenFromRequest(authHeader);
    // Firebase Admin SDKの認証サービスにアクセスして、verifyIdToken()でトークンを検証。
    //トークンが有効なら、トークンに含まれる情報（デコードされたユーザー情報）を返す
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // リクエストにユーザーIDを追加して、後続のルートでユーザーIDを使用できるようにする
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    res.status(401).json({ error: "Unauthorized:Invalid IDtoken" });
  }
};

// リクエストヘッダーからトークンを取り出す関数
export function getTokenFromRequest(authHeader: string | undefined): string {
  if (!authHeader) {
    console.error("No authorization header found");
    throw new Error("No authorization header found");
  } else {
    const idToken = authHeader.split(":")[1];
    return idToken;
  }
}