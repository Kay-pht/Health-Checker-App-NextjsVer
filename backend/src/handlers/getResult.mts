import { Request, Response } from "express";
import { getResultById } from "../service/mongoDB.mjs";
import { objectResultIdSchema } from "../schemas/resultIdSchema.mjs";
import { analyzedResultSchema } from "../schemas/analyzedResultSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import { CustomAuthRequest } from "../interfaces/interfaces";
import userIdSchema from "../schemas/userIdSchema.mjs";

const getResult = async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果をDBから取得してフロントに返却
    const userId = userIdSchema.parse(req.userId);
    const resultId = objectResultIdSchema.parse(req.params.resultId);
    const results = await getResultById(resultId, userId, resultsCollection);
    const validatedResults = analyzedResultSchema.parse(results);

    res.status(200).json(validatedResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getResult;
