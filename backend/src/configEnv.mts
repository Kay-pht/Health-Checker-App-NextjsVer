import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const configEnv = {
  openaiApiKey: process.env.OPENAI_API_KEY,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 5050,
  mongoUri: process.env.MONGO_URI,
  serviceAccountKey: process.env.SERVICE_ACCOUNT_KEY,
  NODE_ENV: process.env.NODE_ENV,
};

export default configEnv;
