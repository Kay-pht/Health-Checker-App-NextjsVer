import { analyzedResultSchema } from "./analyzedResultSchema.mjs";

describe("analyzedResultSchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      missingNutrients: ["vitamin A", "vitamin C"],
      recommendedFoods: ["carrot", "orange"],
      score: 90,
    };
    expect(() => analyzedResultSchema.parse(validInput)).not.toThrow();
  });

  it("should throw an error for invalid input", () => {
    const invalidInput = {
      missingNutrients: ["vitamin A", "vitamin C"],
      recommendedFoods: ["carrot", "orange"],
      score: "90",
    };
    expect(() => analyzedResultSchema.parse(invalidInput)).toThrow();
  });
});
it("should throw an error for missing required fields", () => {
  const validInput = {
    missingNutrients: [],
    recommendedFoods: ["carrot", "orange"],
    score: 90,
  };
  const expectedOutput = {
    missingNutrients: [],
    recommendedFoods: ["carrot", "orange"],
    score: 90,
  };
  expect(analyzedResultSchema.parse(validInput)).toEqual(expectedOutput);
});
it("should throw an error for invalid input", () => {
  const invalidInput = {
    missingNutrients: ["vitamin A", "vitamin C"],
    recommendedFoods: ["carrot", "orange"],
    score: "90",
  };
  expect(() => analyzedResultSchema.parse(invalidInput)).toThrow();
});
