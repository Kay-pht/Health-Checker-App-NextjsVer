import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import type { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getTokenFromRequestHeader } from "../helpers/utils.mjs";

// クライアントから送られてきたトークンの検証
// TODO:identify error status code by customizing error
export const verifyTokenMiddleware = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const idToken = getTokenFromRequestHeader(req.headers.authorization);
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
