import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getResultById } from "../service/mongoDB.mjs";

const getResult = async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果DBから取得してフロントに返却
    const results = await getResultById(req);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getResult;
