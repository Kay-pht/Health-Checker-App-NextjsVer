import express, { NextFunction, Request, Response } from "express";
import postChatCompletion from "./handlers/postChatCompletion.mjs";
import getMyPage from "./handlers/getMyPage.mjs";
import getAuthToken from "./handlers/getAuthToken.mjs";
import getResult from "./handlers/getResult.mjs";
import cors from "cors";
import { verifyTokenMiddleware } from "./middlewares/verifyTokenMiddleware.mjs";
import OpenAI from "openai";
import { CustomAuthRequest } from "./interfaces/interfaces";
import { initializeFirebaseAdmin } from "./service/firebase.mjs";
import configEnv from "./configEnv.mjs";
import { connectToDatabase } from "./helpers/connectDB.mjs";
import decodeAccountKey from "./helpers/utils.mjs";

const app = express();

const { port } = configEnv || 5050;

app.use(express.json());

//TODO:allow CORS to be configured properly
app.use(
  cors({
    origin:
      configEnv.NODE_ENV === "production"
        ? "https://www.healthchecker.app"
        : "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

initializeFirebaseAdmin(configEnv.serviceAccountKey, decodeAccountKey); // initializing firebase SDK

connectToDatabase(); // connecting to MongoDB

const openai = new OpenAI({
  apiKey: configEnv.openaiApiKey,
});

// routes
app.post(
  "/api/completion",
  verifyTokenMiddleware,
  (req: Request, res: Response) =>
    postChatCompletion(req as CustomAuthRequest, res, openai)
);
app.get("/api/auth", verifyTokenMiddleware, getAuthToken);
app.get("/api/result/:resultId", verifyTokenMiddleware, getResult);
app.get("/api/mypage", verifyTokenMiddleware, getMyPage);
app.get("/", (_req: Request, res: Response) => {
  res.json("Hello, World! I'm running on Express Server.");
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(Number(port), () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`NODE_ENV: ${configEnv.NODE_ENV}`);
});

export default app;
