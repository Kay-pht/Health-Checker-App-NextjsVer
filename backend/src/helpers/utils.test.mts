import decodeAccountKey from "./utils.mjs";
import { prompt } from "./utils.mjs";

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

describe("prompt", () => {
  it("returns an array of chat completion messages", () => {
    const userAnswer = { q1: "answer1", q2: "answer2" };
    const rolePrompt = "assistant";
    const taskPrompt = "hello";
    expect(prompt(userAnswer, rolePrompt, taskPrompt)).toEqual([
      {
        role: "system",
        content: rolePrompt,
      },
      {
        role: "user",
        content: taskPrompt,
      },
      {
        role: "system",
        content: "指示に従い,フォーマットに沿ってすべての項目に回答します。",
      },
      {
        role: "user",
        content: JSON.stringify(userAnswer),
      },
    ]);
  });
});
