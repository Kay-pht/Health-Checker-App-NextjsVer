import { Response, NextFunction } from "express";
import admin from "firebase-admin";
import type { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getTokenFromRequestHeader } from "../helpers/utils.mjs";
import { UnauthorizedAccessError } from "../errors/customErrors.mjs";
import handleErrors from "../helpers/errorHandlers.mjs";

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
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.userId = decodedToken.uid;
      next();
    } catch {
      throw new UnauthorizedAccessError(`Unauthorized access by {idToken}`);
    }
    // リクエストにユーザーIDを追加して、後続のルートでユーザーIDを使用できるようにする
  } catch (error) {
    console.error("Error verifying ID token:", error);
    // possible errors are below:
    // - TokenSchemaError (401 Unauthorized)
    // - UnauthorizedAccessError (403 Forbidden)
    // - Generic Error (500 Internal Server Error)
    const { statusCode, body } = handleErrors(error);
    res.status(statusCode).json(body);
    console.error("Failed to verify token", error);
  }
};

// if (error instanceof TokenSchemaError) {
//   res.status(ERROR_MESSAGES.TOKEN_SCHEMA_ERROR.statusCode).json({
//     error: {
//       code: ERROR_MESSAGES.TOKEN_SCHEMA_ERROR.code,
//       message: ERROR_MESSAGES.TOKEN_SCHEMA_ERROR.message,
//     },
//   });
// } else if (error instanceof Error) {
//   res.status(ERROR_MESSAGES.UNAUTHORIZED_ACCESS.statusCode).json({
//     error: {
//       code: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.code,
//       message: ERROR_MESSAGES.UNAUTHORIZED_ACCESS.message,
//     },
//   });
// } else {
//   res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.statusCode).json({
//     error: {
//       code: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.code,
//       message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message,
//     },
//   });
// }
