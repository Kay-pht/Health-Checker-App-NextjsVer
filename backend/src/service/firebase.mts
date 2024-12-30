import admin from "firebase-admin";

//firebase SDKの初期化
export const initializeFirebaseAdmin = async (serviceAccountKey: string) => {
  try {
    // エンコードされたキーをbase64形式でデコード。その後、JSON形式でキーを読み出す
    const serviceAccount = JSON.parse(
      Buffer.from(serviceAccountKey, "base64").toString("utf-8")
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Failed to read service account key file:", error);
    process.exit(1);
  }
};
