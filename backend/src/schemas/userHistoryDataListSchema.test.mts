import userHistoryDataListSchema from "./userHistoryDataListSchema.mjs";

describe("userHistoryDataListSchema", () => {
  it("should validate a correct input", () => {
    const validInput = Array.from({ length: 20 }, () => ({
      recommendedFoods: ["food1", "food2"],
      missingNutrients: ["nutrient1", "nutrient2"],
      score: 100,
      createdAt: new Date(),
    }));
    expect(() => userHistoryDataListSchema.parse(validInput)).not.toThrow();
  });

  it("should throw an error for invalid value format in createdAt", () => {
    const invalidInput = [
      {
        recommendedFoods: ["food1", "food2"],
        missingNutrients: ["nutrient1", "nutrient2"],
        score: 100,
        createdAt: "2021-01-01",
      },
    ];
    expect(() => userHistoryDataListSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for invalid value format in score", () => {
    const invalidInput = [
      {
        recommendedFoods: ["food1", "food2"],
        missingNutrients: ["nutrient1", "nutrient2"],
        score: "100",
        createdAt: new Date(),
      },
    ];
    expect(() => userHistoryDataListSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for invalid value format in missingNutrients", () => {
    const invalidInput = [
      {
        recommendedFoods: ["food1", "food2"],
        missingNutrients: "nutrient1",
        score: 100,
        createdAt: new Date(),
      },
    ];
    expect(() => userHistoryDataListSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for invalid value format in recommendedFoods", () => {
    const invalidInput = [
      {
        recommendedFoods: "",
        missingNutrients: ["nutrient1", "nutrient2"],
        score: 100,
        createdAt: new Date(),
      },
    ];
    expect(() => userHistoryDataListSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for too few keys", () => {
    const invalidInput = [
      {
        recommendedFoods: ["food1", "food2"],
        missingNutrients: ["nutrient1", "nutrient2"],
        score: 100,
      },
    ];
    expect(() => userHistoryDataListSchema.parse(invalidInput)).toThrow();
  });

  it("should be the same as an expected output", () => {
    const input = [
      {
        recommendedFoods: ["food1", "food2"],
        missingNutrients: ["nutrient1", "nutrient2"],
        score: 100,
        createdAt: new Date(),
        userId: "invalidUserId",
      },
    ];
    const expectedOutput = [
      {
        recommendedFoods: ["food1", "food2"],
        missingNutrients: ["nutrient1", "nutrient2"],
        score: 100,
        createdAt: new Date(),
      },
    ];
    expect(userHistoryDataListSchema.parse(input)).toEqual(expectedOutput);
  });

  it("should throw an error for too many objects", () => {
    const invalidInput = Array.from({ length: 21 }, () => ({
      recommendedFoods: ["food1", "food2"],
      missingNutrients: ["nutrient1", "nutrient2"],
      score: 100,
      createdAt: new Date(),
    }));
    expect(() => userHistoryDataListSchema.parse(invalidInput)).toThrow();
  });
});
