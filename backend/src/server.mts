import express, { NextFunction, Request, Response } from "express";
import "./helpers/connectDB.mjs";
import configEnv from "./configEnv.mjs";
import { firebaseAuthMiddleware } from "./middlewares/firebaseAuthMiddleware.mjs";
import postChatCompletion from "./handlers/postChatCompletion.mjs";
import getMyPage from "./handlers/getMyPage.mjs";
import getAuthToken from "./handlers/getAuthToken.mjs";
import getResult from "./handlers/getResult.mjs";
import cors from "cors";

const app = express();
const { port } = configEnv || 5050;

//TODO:特定のオリジンからのリクエストのみを許可する
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

// ルーティング
app.post("/api/completion", firebaseAuthMiddleware, postChatCompletion);
app.get("/api/auth", firebaseAuthMiddleware, getAuthToken);
app.get("/api/result/:resultId", firebaseAuthMiddleware, getResult);
app.get("/api/mypage", firebaseAuthMiddleware, getMyPage);
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
