import admin from "firebase-admin";

//firebase SDKの初期化
export const initializeFirebaseAdmin = (
  serviceAccountKey: string,
  decodeAccountKey: (serviceAccountKey: string) => {}
) => {
  try {
    //TODO: テスト用に関数を引数から渡す設計にしたが検討余地アリ
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
