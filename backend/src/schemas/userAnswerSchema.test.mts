import { userAnswerSchema } from "./userAnswerSchema.mjs";

describe("userAnswerSchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`q${i + 1}`, "f1"])
      ),
    };

    expect(() => userAnswerSchema.parse(validInput)).not.toThrow();
  });

  it("should be same as expectedOutput", () => {
    const Input = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`q${i + 1}`, null])
      ),
    };
    const expectedOutput = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`q${i + 1}`, "f1"])
      ),
    };
    expect(userAnswerSchema.parse(Input)).toEqual(expectedOutput);
  });

  it("should throw an error for invalid key format", () => {
    const invalidInput = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`q${i + 1}`, "f10"])
      ),
    };

    expect(() => userAnswerSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for invalid key format which follows t instead of q", () => {
    const invalidInput = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`t${i + 1}`, "f1"])
      ),
    };
    expect(() => userAnswerSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for invalid value format", () => {
    const invalidInput = {
      content: Object.fromEntries(
        Array.from({ length: 25 }, (_, i) => [`q${i + 1}`, "t1"])
      ),
    };
    expect(() => userAnswerSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for too few keys", () => {
    const invalidInput = {
      content: {
        q1: "f1",
        q2: "f2",
        q3: "f3",
      },
    };
    expect(() => userAnswerSchema.parse(invalidInput)).toThrow();
  });

  it("should throw an error for too many keys", () => {
    const invalidInput = {
      content: Object.fromEntries(
        Array.from({ length: 26 }, (_, i) => [`q${i + 1}`, `f1`])
      ),
    };
    expect(() => userAnswerSchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for a disordered answer", () => {
    const disorderedInput = {
      content: {
        q1: "f1",
        q3: "f3", // q2 is missing
        q2: "f2",
        q4: "f4",
        q5: "f5",
        q7: "f7",
        q6: "f6",
        q8: "f8",
        q9: "f9",
        q11: "f11",
        q10: "f10",
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
    expect(() => userAnswerSchema.parse(disorderedInput)).toThrow();
  });
});
