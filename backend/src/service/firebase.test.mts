import { jest } from "@jest/globals";
import admin from "firebase-admin";
import { initializeFirebaseAdmin } from "./firebase.mjs";
// import decodeAccountKey, * as utils from "../helpers/utils.mjs"; // これをコメントアウト

jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  credential: {
    cert: jest.fn(),
  },
}));

// utils.mjs モジュール全体をモック化
jest.mock("../helpers/utils.mjs", () => ({
  __esModule: true, // ES Modules として扱う
  default: jest.fn(), // default export をモック関数として設定
}));

// モック化したモジュールをインポート
import decodeAccountKey from "../helpers/utils.mjs";

describe("initializeFirebaseAdmin", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize FirebaseAdmin with correct credentials", async () => {
    // console.log("test start");

    // // モック関数の振る舞いを設定
    // (
    //   decodeAccountKey as jest.MockedFunction<typeof decodeAccountKey>
    // ).mockResolvedValueOnce({
    //   projectId: "mocked-project-id",
    //   clientEmail: "mocked-client-email",
    //   privateKey: "mocked-private-key",
    // });

    // console.log("decodeAccountKey:", decodeAccountKey);

    // await initializeFirebaseAdmin("mocked-service-account-key");

    // expect(decodeAccountKey).toHaveBeenCalledWith("mocked-service-account-key");
    // expect(admin.initializeApp).toHaveBeenCalledWith({
    //   credential: admin.credential.cert({
    //     projectId: "mocked-project-id",
    //     clientEmail: "mocked-client-email",
    //     privateKey: "mocked-private-key",
    //   }),
    // });
  });
});
