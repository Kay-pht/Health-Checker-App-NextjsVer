import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getUserHistoryById } from "../service/mongoDB.mjs";
import userHistoryDataListSchema from "../schemas/userHistoryDataListSchema.mjs";

const getMyPage = async (req: CustomAuthRequest, res: Response) => {
  try {
    // これまでの診断結果DBから取得してフロントに返却
    const { userId } = req;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid User ID");
    }

    const results = await getUserHistoryById(userId);
    const validatedResults = userHistoryDataListSchema.parse(results);
    console.log("validatedResults", validatedResults);

    res.status(200).json(validatedResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getMyPage;
