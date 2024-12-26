import { objectResultIdSchema } from "./resultIdSchema.mjs";

describe("objectResultIdSchema", () => {
  it("should validate a correct MongoDB ObjectId", () => {
    const validObjectId = "507f1f77bcf86cd799439011";
    expect(() => objectResultIdSchema.parse(validObjectId)).not.toThrow();
  });

  it("should throw an error for an invalid letter ", () => {
    const invalidObjectId = "invalid-object-id";
    expect(() => objectResultIdSchema.parse(invalidObjectId)).toThrow(
      "Invalid MongoDB ObjectId format"
    );
  });
  it("should throw an error for an long ObjectId", () => {
    const invalidObjectId = "507f1f77bcf86cd7994390111";
    expect(() => objectResultIdSchema.parse(invalidObjectId)).toThrow(
      "Invalid MongoDB ObjectId format"
    );
  });
  it("should throw an error for an short ObjectId", () => {
    const invalidObjectId = "507f1f77bcf86cd79943901";
    expect(() => objectResultIdSchema.parse(invalidObjectId)).toThrow(
      "Invalid MongoDB ObjectId format"
    );
  });
});
