import dotenv from "dotenv";
import { validateEnv } from "./helpers/validateSchemaFunc.mjs";

// Load environment variables from .env file
dotenv.config();

const rawConfigEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  port: process.env.PORT || 5050,
  mongoUri: process.env.MONGO_URI,
  serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY,
  NODE_ENV: process.env.NODE_ENV || "development",
  frontendBaseUrl: process.env.FRONTEND_BASE_URL || "http://localhost:3000",
  frontendDomain: process.env.FRONTEND_DOMAIN,
  rolePrompt: process.env.ROLE_PROMPT,
  taskPrompt: process.env.TASK_PROMPT,
};

const configEnv = validateEnv(rawConfigEnv);

export default configEnv;
