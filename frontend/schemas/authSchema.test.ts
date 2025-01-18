import { registerValidationSchema } from "@/schemas/authSchema";

// only testing the registerValidationSchema because the loginValidationSchema and forgetValidationSchema are similar
describe("registerValidationSchema", () => {
  it("should validate correct input", () => {
    const validInput = {
      name: "John Doe",
      email: "example@example.com",
      password: "password123",
      confirm: "password123",
    };
    expect(() => registerValidationSchema.parse(validInput)).not.toThrow();
  });
  it("should throw an error for invalid email", () => {
    const invalidInput = {
      name: "John Doe",
      email: "example",
      password: "password123",
      confirm: "password123",
    };
    expect(() => registerValidationSchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for missing required fields", () => {
    const validInput = {
      email: "example@example.com",
      password: "password123",
      confirm: "password123",
    };
    expect(() => registerValidationSchema.parse(validInput)).toThrow();
  });
  it("should throw an error for invalid password", () => {
    const invalidInput = {
      name: "John Doe",
      email: "example@example.com",
      password: "pass",
      confirm: "pass",
    };
    expect(() => registerValidationSchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for passwords not matching", () => {
    const invalidInput = {
      name: "John Doe",
      email: "example@example.com",
      password: "password123",
      confirm: "password1234",
    };
    expect(() => registerValidationSchema.parse(invalidInput)).toThrow();
  });
  it("should throw an error for passwords not matching", () => {
    const invalidInput = {
      name: "John Doe",
      email: "example@example.com",
      password: "password123",
      confirm: "password1234",
      extra: "extra",
    };
    expect(() => registerValidationSchema.parse(invalidInput)).toThrow();
  });
});
