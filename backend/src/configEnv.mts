import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const configEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  port: process.env.PORT || 5050,
  mongoUri: process.env.MONGO_URI,
  serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY,
  NODE_ENV: process.env.NODE_ENV,
  frontendBaseUrl: process.env.FRONTEND_BASE_URL,
  frontendDomain: process.env.FRONTEND_DOMAIN,
};

export default configEnv;
