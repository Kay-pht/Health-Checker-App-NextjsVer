import envSchema from "./envSchema.mjs";

describe("envSchema", () => {
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
    expect(() => envSchema.parse(validInput)).not.toThrow();
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
    expect(() => envSchema.parse(invalidInput)).toThrow();
  });
});
