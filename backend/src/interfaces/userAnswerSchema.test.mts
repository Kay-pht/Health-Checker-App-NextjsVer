import { requestBodySchema } from "./userAnswerSchema.mjs";
import { responseFromAISchema } from "./userAnswerSchema.mjs";

describe("requestBodySchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      content: {
        q1: "f1",
        q2: "f2",
        q3: "f3",
        q4: "f4",
        q5: "f5",
        q6: "f6",
        q7: "f7",
        q8: "f8",
        q9: "f9",
        q10: "f10",
        q11: "f11",
        q12: "f12",
        q13: "f13",
        q14: "f14",
        q15: "f15",
        q16: "f16",
        q17: "f17",
        q18: "f18",
        q19: "f19",
        q20: "f20",
        q21: "f21",
        q22: "f22",
        q23: "f23",
        q24: "f24",
        q25: "f25",
      },
    };

    expect(() => requestBodySchema.parse(validInput)).not.toThrow();
  });

  it("should throw an error for invalid key format", () => {
    const invalidInput = {
      content: {
        question1: "f1", // 修正箇所: キーが 'q' で始まらない
      },
    };
    expect(() => requestBodySchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for invalid value format", () => {
    const invalidInput = {
      content: {
        q1: "value1", // 修正箇所: 値が 'f' で始まらない
      },
    };
    expect(() => requestBodySchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for too few keys", () => {
    const invalidInput = {
      content: {
        q1: "f1",
        q2: "f2",
        q3: "f3",
        q4: "f4",
      },
    };
    expect(() => requestBodySchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for too many keys", () => {
    const invalidInput = {
      content: Object.fromEntries(
        Array.from({ length: 26 }, (_, i) => [`q${i + 1}`, `f${i + 1}`])
      ),
    };
    expect(() => requestBodySchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for too few keys", () => {
    const validInput = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`q${i + 1}`, `f${i + 1}`])
      ),
    };
    expect(() => requestBodySchema.parse(validInput)).not.toThrow();
  });
});

describe("responseFromAISchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      missingNutrients: ["vitamin A", "vitamin C"],
      recommendedFoods: ["carrot", "orange"],
      score: 90,
    };
    expect(() => responseFromAISchema.parse(validInput)).not.toThrow();
  });

  it("should throw an error for invalid input", () => {
    const invalidInput = {
      missingNutrients: ["vitamin A", "vitamin C"],
      recommendedFoods: ["carrot", "orange"],
      score: "90",
    };
    expect(() => responseFromAISchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for missing required fields", () => {
    const invalidInput = {
      recommendedFoods: ["carrot", "orange"],
      score: 90,
    };
    expect(() => responseFromAISchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for invalid input", () => {
    const invalidInput = {
      missingNutrients: ["vitamin A", "vitamin C"],
      recommendedFoods: ["carrot", "orange"],
      score: "90",
    };
    expect(() => responseFromAISchema.parse(invalidInput)).toThrow();
  });
});
