import { jest } from "@jest/globals";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "./firebase.mjs";

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
    }),
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
    mockDecodeAccountKey.mockRestore();
  });

  afterAll(() => {
    jest.restoreAllMocks();
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

  it("should exit the process if failed to decode service account key", async () => {
    const serviceAccountKey = "mocked-service-account-key";

    mockDecodeAccountKey.mockImplementation(() => {
      throw new Error("Failed to decode Firebase service account key");
    });

    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("Process Exit");
    });
    try {
      initializeFirebaseAdmin(serviceAccountKey, mockDecodeAccountKey);
    } catch {
      console.log("error occurred in initializeFirebaseAdmin");
    }

    expect(mockDecodeAccountKey).toHaveBeenCalledWith(serviceAccountKey);
    expect(admin.initializeApp).not.toHaveBeenCalled();
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  it("should exit the process if failed to initialize Firebase SDK", async () => {
    const serviceAccountKey = "mocked-service-account-key";
    // mockDecodeAccountKey.mockImplementation(() => {});
    // initializeApp がエラーをスローするようにモック
    (admin.initializeApp as jest.Mock).mockImplementation(() => {
      throw new Error("Failed to initialize Firebase SDK");
    });

    const exitSpy = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("Process Exit");
    });
    try {
      initializeFirebaseAdmin(serviceAccountKey, mockDecodeAccountKey);
    } catch {
      console.log("error occurred in initializeFirebaseAdmin");

      expect(mockDecodeAccountKey).toHaveBeenCalledWith(serviceAccountKey);
      expect(mockDecodeAccountKey).toHaveBeenCalledTimes(1);
      expect(admin.initializeApp).toHaveBeenCalled();
      expect(exitSpy).toHaveBeenCalledWith(1);
    }
  });
});
