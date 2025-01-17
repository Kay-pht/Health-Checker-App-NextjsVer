import userIdSchema, { authTokenSchema } from "./utilSchemas.mjs";

describe("userIdSchema", () => {
  it("should validate correct input", () => {
    const validInput = "abcdef";
    expect(() => userIdSchema.parse(validInput)).not.toThrow();
  });

  it("should throw an error for too short input", () => {
    const invalidInput = "abc";
    expect(() => userIdSchema.parse(invalidInput)).toThrow();
  });
});

describe("authTokenSchema", () => {
  it("should validate correct input", () => {
    const validInput = "abcdefghijk";
    expect(() => authTokenSchema.parse(validInput)).not.toThrow();
  });

  it("should throw an error for too short input", () => {
    const invalidInput = "abc";
    expect(() => authTokenSchema.parse(invalidInput)).toThrow();
  });
});
