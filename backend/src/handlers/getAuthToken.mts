import { Request, Response } from "express";

// ブラウザにCookieをセットする
const getAuthToken = async (req: Request, res: Response) => {
  try {
    res.status(200).json("validating token is successful");
  } catch (error) {
    console.error("Error in getAuthToken:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getAuthToken;
