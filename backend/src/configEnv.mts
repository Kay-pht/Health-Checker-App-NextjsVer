import dotenv from "dotenv";
import envSchema from "./schemas/envSchema.mjs";
import { z } from "zod";

// Load environment variables from .env file
dotenv.config();

const rawConfigEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  port: process.env.PORT || 5050,
  mongoUri: process.env.MONGO_URI,
  serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY,
  NODE_ENV: process.env.NODE_ENV,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
  frontendDomain: process.env.FRONTEND_DOMAIN,
  rolePrompt: process.env.ROLE_PROMPT,
  taskPrompt: process.env.TASK_PROMPT,
};

const getVerifiedEnv = (
  config: typeof rawConfigEnv
): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Invalid environment variables:", error.errors);
    } else {
      console.error("Unexpected error:", error);
    }
    process.exit(1);
  }
};

const configEnv = getVerifiedEnv(rawConfigEnv);

export default configEnv;
