import decodeAccountKey from "./utils.mjs";
import { getVerifiedEnv } from "./utils.mjs";
import { jest } from "@jest/globals";

describe("decodeBase64", () => {
  it("should decode a valid Base64 string to an object", () => {
    // このテストは、有効なBase64文字列をデコードしてオブジェクトに変換することを確認します。
    const base64String = Buffer.from('{"key":"value"}').toString("base64");
    const result = decodeAccountKey(base64String);
    expect(result).toEqual({ key: "value" });
  });

  it("should throw an error for an invalid Base64 string", () => {
    // このテストは、無効なBase64文字列が渡されたときに例外がスローされることを確認します。
    const invalidBase64String = "invalid-base64";
    expect(() => decodeAccountKey(invalidBase64String)).toThrow();
  });
});

const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
  throw new Error("process.exit called"); // toThrowでキャッチできるようにエラーを投げる
});

describe("getVerifiedEnv", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should validate correct input", () => {
    const validInput = {
      openaiApiKey: "openaiApiKey",
      port: 3000,
      mongoUri: "mongoUri",
      serviceAccountKey: "serviceAccountKey",
      NODE_ENV: "development",
      frontendBaseUrl: "frontendBaseUrl",
      frontendDomain: "frontendDomain",
      rolePrompt: "rolePrompt",
      taskPrompt: "taskPrompt",
    };
    expect(() => getVerifiedEnv(validInput)).not.toThrow();
  });

  it("should throw an error for invalid input due to missing required fields", () => {
    const invalidInput = {
      openaiApiKey: "openaiApiKey",
      port: 3000,
      mongoUri: "mongoUri",
      serviceAccountKey: "serviceAccountKey",
      NODE_ENV: "development",
      frontendBaseUrl: "frontendBaseUrl",
      frontendDomain: "frontendDomain",
      rolePrompt: "rolePrompt",
    };
    expect(() => getVerifiedEnv(invalidInput)).toThrow("process.exit called");

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
