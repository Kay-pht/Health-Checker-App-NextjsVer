import { z } from "zod";

const userIdSchema = z
  .string()
  .min(5, "User ID must be at least 5 characters long");

export default userIdSchema;

export const authTokenSchema = z
  .string()
  .min(10, "Token must be at least 10 characters long");