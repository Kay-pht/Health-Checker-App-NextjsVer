var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import configEnv from "../configEnv.mjs";
import admin from "firebase-admin";
const { serviceAccountKey } = configEnv;
//firebase SDKの初期化
export const initializeFirebaseAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!serviceAccountKey) {
            throw new Error("Service account key is not defined in the environment variables.");
        }
        // エンコードされたキーをbase64形式でデコード。その後、JSON形式でキーを読み出す
        const serviceAccount = JSON.parse(Buffer.from(serviceAccountKey, "base64").toString("utf-8"));
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
        console.log("Firebase Admin initialized successfully.");
    }
    catch (error) {
        console.error("Failed to read service account key file:", error);
        process.exit(1);
    }
});
