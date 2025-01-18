import { DbDataSchemaError } from "../errors/customErrors.mjs";
import { validateEnv, validateHistoryDataList } from "./validateSchemaFunc.mjs";
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

// TODO: write tests
describe("validateHistoryDataList", () => {
  it("should validate correct input", () => {
    const validInput = [
      {
        recommendedFoods: ["sampleRecommendedFood1", "sampleRecommendedFood2"],
        missingNutrients: ["sampleMissingNutrient1", "sampleMissingNutrient2"],
        createdAt: new Date(),
        score: 100,
      },
    ];
    expect(validateHistoryDataList(validInput)).toEqual(validInput);
  });

  it("should throw a DbDataSchemaError for invalid input", () => {
    const invalidInput = [
      {
        userId: "sampleUserId",
        recommendedFoods: ["sampleRecommendedFood1", "sampleRecommendedFood2"],
        missingNutrients: ["sampleMissingNutrient1", 100],
        createdAt: new Date(),
        score: 100,
        resultId: "sampleResultId",
      },
    ];
    // @ts-expect-error: Testing for invalid input that should throw an error
    expect(() => validateHistoryDataList(invalidInput)).toThrow(
      "The data is not in the correct format"
    );
    // @ts-expect-error: Testing for invalid input that should throw an error
    expect(() => validateHistoryDataList(invalidInput)).toThrow(
      DbDataSchemaError
    );
  });
});
