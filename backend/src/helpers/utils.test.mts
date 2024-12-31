import decodeAccountKey from "./utils.mjs";

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
