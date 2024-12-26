import { z } from "zod";

// for result page
// check if the resultId has 24 characters and is a hexadecimal string
export const objectResultIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, {
  message: "Invalid MongoDB ObjectId format",
});
