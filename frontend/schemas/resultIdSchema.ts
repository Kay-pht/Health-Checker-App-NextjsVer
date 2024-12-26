import { z } from "zod";

// already tested in backend
// check if the resultId has 24 characters and is a hexadecimal string
export const resultIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, {
  message: "Invalid result Id format",
});
