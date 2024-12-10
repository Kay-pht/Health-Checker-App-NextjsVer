var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "../service/firebase.mjs";
//firebase SDKの初期化
initializeFirebaseAdmin();
// クライアントから送られてきたトークンの検証
export const firebaseAuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    try {
        const idToken = getTokenFromRequest(authHeader);
        // Firebase Admin SDKの認証サービスにアクセスして、verifyIdToken()でトークンを検証。
        //トークンが有効なら、トークンに含まれる情報（デコードされたユーザー情報）を返す
        const decodedToken = yield admin.auth().verifyIdToken(idToken);
        // リクエストにユーザーIDを追加して、後続のルートでユーザーIDを使用できるようにする
        req.userId = decodedToken.uid;
        next();
    }
    catch (error) {
        console.error("Error verifying ID token:", error);
        res.status(403).json({ error: "Invalid token" });
    }
});
// アプリケーションロジックの分離
function getTokenFromRequest(authHeader) {
    if (!authHeader) {
        console.error("No authorization header found");
        throw new Error("No authorization header found");
    }
    else {
        const idToken = authHeader.split(":")[1];
        return idToken;
    }
}
