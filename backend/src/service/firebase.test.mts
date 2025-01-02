import { jest } from "@jest/globals";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "./firebase.mjs";
import utils from "../helpers/utils.mjs"; // デフォルトインポート

// 'firebase-admin'モジュールのモック設定を修正
jest
  .spyOn(admin, "initializeApp")
  .mockImplementation((options?: admin.AppOptions, name?: string) => {
    return {
      name: name || "[DEFAULT]",
      options: options || {},
      // テストに必要な App オブジェクトのメソッドのみをモック化
    } as unknown as admin.app.App; // admin.app.App 型にキャスト
  });
jest.spyOn(admin.credential, "cert").mockImplementation(() => ({
  projectId: "mocked-project-id",
  clientEmail: "mocked-client-email",
  privateKey: "mocked-private-key",
  getAccessToken: () =>
    Promise.resolve({
      access_token: "mocked-access-token",
      expires_in: 3600,
    }), // getAccessToken メソッドのモックを追加
}));

describe("initializeFirebaseAdmin", () => {
  const mockDecodeAccountKey = jest.fn(() => ({
    projectId: "mocked-project-id",
    clientEmail: "mocked-client-email",
    privateKey: "mocked-private-key",
  }));
  beforeEach(() => {
    (admin.initializeApp as jest.Mock).mockClear();
    (admin.credential.cert as jest.Mock).mockClear();
    mockDecodeAccountKey.mockClear();
  });

  it("should initialize FirebaseAdmin with correct credentials", async () => {
    const serviceAccountKey = "mocked-service-account-key";

    initializeFirebaseAdmin(serviceAccountKey, mockDecodeAccountKey);
    expect(mockDecodeAccountKey).toHaveBeenCalledWith(serviceAccountKey);

    expect(admin.initializeApp).toHaveBeenCalledWith({
      credential: expect.objectContaining({
        projectId: "mocked-project-id",
        clientEmail: "mocked-client-email",
        privateKey: "mocked-private-key",
      }),
    });
  });
});
