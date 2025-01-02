import admin from "firebase-admin";

//firebase SDKの初期化
export const initializeFirebaseAdmin = (
  serviceAccountKey: string,
  decodeAccountKey: (serviceAccountKey: string) => {}
) => {
  try {
    // エンコードされたキーをbase64形式でデコード。その後、JSON形式でキーを読み出す
    const serviceAccount = decodeAccountKey(serviceAccountKey);

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
    console.log("Firebase Admin initialized successfully.");
  } catch (error) {
    console.error("Failed to initialize Firebase SDK", error);
    process.exit(1);
  }
};
