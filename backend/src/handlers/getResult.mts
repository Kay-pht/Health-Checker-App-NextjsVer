import { Request, Response } from "express";
import { getResultById } from "../service/mongoDB.mjs";
import { objectResultIdSchema } from "../schemas/resultIdSchema.mjs";
import { analyzedResultSchema } from "../schemas/analyzedResultSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";

const getResult = async (req: Request, res: Response) => {
  try {
    // これまでの診断結果をDBから取得してフロントに返却
    const resultId = objectResultIdSchema.parse(req.params.resultId);
    const results = await getResultById(resultId, resultsCollection);
    const validatedResults = analyzedResultSchema.parse(results);

    res.status(200).json(validatedResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getResult;
