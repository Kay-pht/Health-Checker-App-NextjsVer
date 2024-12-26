import { Request, Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getResultById } from "../service/mongoDB.mjs";
import { objectResultIdSchema } from "../interfaces/requestSchema.mjs";

const getResult = async (req: Request, res: Response) => {
  try {
    // これまでの診断結果DBから取得してフロントに返却
    const resultId = objectResultIdSchema.parse(req.params.resultId);
    const results = await getResultById(resultId);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getResult;
