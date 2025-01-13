import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import type { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getTokenFromRequestHeader } from "../helpers/utils.mjs";
import { TokenNotFoundError } from "../errors/customErrors.mjs";
import ERROR_MESSAGES from "../errors/errorMessages.mjs";

// クライアントから送られてきたトークンの検証
export const verifyTokenMiddleware = async (
  req: CustomAuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const idToken = getTokenFromRequestHeader(req.headers.authorization);
    // Firebase Admin SDKの認証サービスにアクセスして、verifyIdToken()でトークンを検証。
    //トークンが有効なら、トークンに含まれる情報（デコードされたユーザー情報）を返す
    // TODO: Result型を使って失敗の場合はUnauthorizedAccessErrorをスルーする

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // リクエストにユーザーIDを追加して、後続のルートでユーザーIDを使用できるようにする
    req.userId = decodedToken.uid;
    next();
  } catch (error) {
    console.error("Error verifying ID token:", error);
    if (error instanceof TokenNotFoundError) {
      res.status(ERROR_MESSAGES.TOKEN_NOT_FOUND.statusCode).json({
        error: {
          code: ERROR_MESSAGES.TOKEN_NOT_FOUND.code,
          message: ERROR_MESSAGES.TOKEN_NOT_FOUND.message,
        },
      });
    } else if (error instanceof Error) {
      res.status(ERROR_MESSAGES.UNAUTHORIZED_ACCESS.statusCode).json({
        error: {
          code: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.code,
          message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.message,
        },
      });
    } else {
      res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.statusCode).json({
        error: {
          code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
          message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
        },
      });
    }
  }
};
