import { z } from "zod";

const userIdSchema = z
  .string()
  .min(5, "User ID must be at least 5 characters long");

export default userIdSchema;
