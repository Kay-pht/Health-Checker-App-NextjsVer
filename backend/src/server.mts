import express, { NextFunction, Request, Response } from "express";
import "./helpers/connectDB.mjs";
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

const app = express();

const { port } = configEnv || 5050;

//TODO:allow CORS to be configured properly
app.use(
  cors({
    origin: true,
    // configEnv.NODE_ENV === "production"
    //   ? configEnv.frontendBaseUrl
    //   : "http://localhost:3000", // 許可するオリジンを指定
    credentials: true, // クッキーを含むリクエストを許可
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const openai = new OpenAI({
  apiKey: configEnv.openaiApiKey,
});
const { serviceAccountKey } = configEnv;

// initializing firebase SDK
initializeFirebaseAdmin(serviceAccountKey);

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
app.get("/", (req: Request, res: Response) => {
  res.json("Hello, World! I'm running on Firebase Express Server.");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(Number(port), () => {
  console.log(`Server is running at http://localhost:${port}`);
  console.log(`NODE_ENV: ${configEnv.NODE_ENV}`);
  console.log(`FRONTEND_DOMAIN: ${configEnv.frontendDomain}`);
});

export default app;
