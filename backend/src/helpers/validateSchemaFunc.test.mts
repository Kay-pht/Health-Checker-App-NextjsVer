import { validateEnv } from "./validateSchemaFunc.mjs";
import { jest } from "@jest/globals";

describe("validateEnv", () => {
  beforeEach(() => {
    jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
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
    expect(() => validateEnv(validInput)).not.toThrow();
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
    expect(() => validateEnv(invalidInput)).toThrow("process.exit called");

    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
