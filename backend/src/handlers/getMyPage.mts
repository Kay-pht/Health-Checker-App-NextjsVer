import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getUserHistoryById } from "../service/mongoDB.mjs";
import userHistoryDataListSchema from "../schemas/userHistoryDataListSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";

const getMyPage = async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果DBから取得してフロントに返却
    const { userId } = req;
    if (!userId) {
      throw new Error("User ID is required");
    }
    const results = await getUserHistoryById(userId, resultsCollection);
    const validatedResults = userHistoryDataListSchema.parse(results);
    res.status(200).json(validatedResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getMyPage;
