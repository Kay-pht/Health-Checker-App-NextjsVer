import { z } from "zod";

// Schema for the request body of the POST /completion endpoint
// The request body must be an object with 25 keys, each key must be a string
// The key must be in the format of "q" followed by a number such as "q1", "q10", etc.
// The value must be in the format of "f" followed by a number or null such as "f1", "f10",null, etc.
export const userAnswerSchema = z.object({
  content: z
    .record(
      z
        .string()
        .regex(/^q\d+$/)
        .min(2, "key must be at least 2 characters")
        .max(3, "key must be less than 4 characters"),
      z
        .string()
        .regex(/^f\d$/)
        .min(2, "key must be at least 2 characters")
        .max(2, "key must be less than 3 characters")
        .nullable()
        .transform((val) => (val === null ? "f1" : val)) //transform null to f1
    )
    .refine((obj) => Object.keys(obj).length === 25, {
      message: "The number of keys must be exactly 25",
    })
    .refine(
      (obj) => {
        const keys = Object.keys(obj);
        for (let i = 0; i < keys.length; i++) {
          if (keys[i] !== `q${i + 1}`) {
            return false;
          }
        }
        return true;
      },
      {
        message: "Keys must be in the order q1, q2, ..., q25",
      }
    ),
});
