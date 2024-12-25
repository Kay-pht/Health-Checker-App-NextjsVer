import { requestBodySchema } from "./userAnswerSchema.mjs";

describe("requestBodySchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      content: {
        q1: "f1",
        q2: "f2",
        q3: "f3",
        q4: "f4",
        q5: "f5",
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
