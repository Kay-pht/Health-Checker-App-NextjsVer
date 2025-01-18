import { z } from "zod";

export const loginValidationSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "At least 8 characters long"),
  })
  .strict();

export type UserAuth = z.infer<typeof loginValidationSchema>;

export const registerValidationSchema = z
  .object({
    name: z.string().min(1, "At least 1 characters long"),
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
    password: z.string().min(8, "At least 8 characters long"),
    confirm: z.string().min(8, "At least 8 characters long"),
  })
  .strict()
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export const forgetValidationSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),
  })
  .strict();
