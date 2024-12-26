import { z } from "zod";

// Schema for the request body of the POST /completion endpoint
// The request body must be an object with 25 keys, each key must be a string
// The key must be in the format of "q" followed by a number such as "q1", "q10", etc.
// The value must be in the format of "f" followed by a number or null such as "f1", "f10",null, etc.
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
        .nullable()
    )
    .refine((obj) => Object.keys(obj).length === 25, {
      message: "The number of keys must be exactly 25",
    }),
});

// Schema for the response from the AI
export const responseFromAISchema = z.object({
  missingNutrients: z.array(z.string()),
  recommendedFoods: z.array(z.string()),
  score: z.number(),
});
