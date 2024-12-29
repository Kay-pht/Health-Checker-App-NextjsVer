import { Request, Response } from "express";
import { getTokenFromRequest } from "../middlewares/verifyTokenMiddleware.mjs";
import configEnv from "../configEnv.mjs";

// ブラウザにCookieをセットする
const getAuthToken = async (req: Request, res: Response) => {
  try {
    // リクエストヘッダーからトークンを取得
    // const authHeader = req.headers.authorization;
    // const token = getTokenFromRequest(authHeader);

    // クッキーの設定
    // res.cookie("authToken", token, {
    //   httpOnly: true,
    //   secure: true,
    //   path: "/",
    //   maxAge: 3600000, // 1 hour
    //   sameSite: "none",
    //   domain:
    //     configEnv.NODE_ENV === "production"
    //       ? configEnv.frontendDomain
    //       : "localhost",
    // });

    res.status(200).json("validating token is successful");
  } catch (error) {
    console.error("Error in getAuthToken:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getAuthToken;
