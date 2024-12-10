var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jest } from "@jest/globals";
// 環境変数を差し替えてテストするために、環境変数を設定してから関数をインポートする必要があるので、動的インポートを採用
describe("initializeFirebaseAdmin", () => {
    const originalEnv = process.env;
    beforeEach(() => {
        // 環境変数のキャッシュをクリア
        jest.resetModules();
        process.env = Object.assign({}, originalEnv);
        jest.spyOn(process, "exit").mockImplementation((code) => {
            throw new Error(`process.exit: ${code}`);
        }); // process.exitをモック
    });
    afterEach(() => {
        process.env = originalEnv; // テスト後に環境変数を元に戻す
    });
    it("should log an error if the service account key is not provided", () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.SERVICE_ACCOUNT_KEY = "";
        const { initializeFirebaseAdmin } = yield import("./firebase.mjs");
        yield expect(initializeFirebaseAdmin()).rejects.toThrow("process.exit: 1");
    }));
    it("should log an error if the service account key is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        process.env.SERVICE_ACCOUNT_KEY = "invalid_service_account_key";
        const { initializeFirebaseAdmin } = yield import("./firebase.mjs");
        yield expect(initializeFirebaseAdmin()).rejects.toThrow("process.exit: 1");
    }));
    it("should initialize Firebase Admin successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        process.env = originalEnv;
        const consoleLogSpy = jest
            .spyOn(console, "log")
            .mockImplementation(() => { });
        const { initializeFirebaseAdmin } = yield import("./firebase.mjs");
        yield initializeFirebaseAdmin();
        expect(consoleLogSpy).toHaveBeenCalledWith("Firebase Admin initialized successfully.");
        consoleLogSpy.mockRestore();
        // const mockedInitializeApp = jest.mocked(
        //   admin.initializeApp as jest.MockedFunction<typeof admin.initializeApp> // 修正: admin.initializeApp を使用
        // );
        // expect(admin.initializeApp).toHaveBeenCalled(); // モック関数が呼ばれたことを確認
    }));
});
