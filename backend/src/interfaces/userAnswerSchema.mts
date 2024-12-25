import { z } from "zod";

export const requestBodySchema = z.object({
  content: z
    .record(
      z
        .string()
        .regex(/^q\d+$/)
        .min(2, "key must be at least 2 characters")
        .max(3, "key must be less than 4 characters"),
      z
        .string()
        .regex(/^f\d+$/)
        .min(2, "key must be at least 2 characters")
        .max(3, "key must be less than 4 characters")
    )
    .refine((obj) => Object.keys(obj).length >= 5, {
      message: "The number of keys must be at least 5",
    })
    .refine((obj) => Object.keys(obj).length <= 25, {
      message: "The number of keys must not exceed 25",
    }),
});
