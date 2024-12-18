import { Request, Response } from "express";
import { getTokenFromRequest } from "../middlewares/firebaseAuthMiddleware.mjs";
import configEnv from "../configEnv.mjs";

// tokenをcookieに格納する
const getAuthToken = async (req: Request, res: Response) => {
  try {
    // トークンの検証
    const authHeader = req.headers.authorization;
    const token = getTokenFromRequest(authHeader);

    // クッキーの設定
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: configEnv.NODE_ENV === "production",
      path: "/",
      maxAge: 3600000, // 1時間
      sameSite: "none", // SameSite cookies を無効化
    });

    res
      .status(200)
      .json({ success: true, message: "Auth token set in cookie" });
  } catch (error) {
    console.error("Error in getAuthToken:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getAuthToken;
