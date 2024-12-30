import { z } from "zod";

const envSchema = z.object({
  openaiApiKey: z.string(),
  port: z.number(),
  mongoUri: z.string(),
  serviceAccountKey: z.string(),
  NODE_ENV: z.enum(["development", "production"]),
  frontendBaseUrl: z.string(),
  frontendDomain: z.string(),
  rolePrompt: z.string(),
  taskPrompt: z.string(),
});

export default envSchema;
