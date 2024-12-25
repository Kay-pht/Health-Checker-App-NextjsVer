import { z } from "zod";

// for result page
export const objectResultIdSchema = z.string().regex(/^[a-fA-F0-9]{24}$/, {
  message: "Invalid MongoDB ObjectId format",
});

// for mypage
