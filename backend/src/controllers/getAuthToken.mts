import { Request, Response } from "express";

// このハンドラはレスを返すだけの役割。ミドルウェアでの検証を目的とするルート
const getAuthToken = async (_req: Request, res: Response) => {
  try {
    res.status(200).json("verifying token successfully");
  } catch (error) {
    // handleErrors(res, error);
    console.error("Error in getAuthToken:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default getAuthToken;
