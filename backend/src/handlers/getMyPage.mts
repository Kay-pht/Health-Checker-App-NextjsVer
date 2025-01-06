import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getUserHistoryById } from "../service/mongoDB.mjs";
import userHistoryDataListSchema from "../schemas/userHistoryDataListSchema.mjs";
import userIdSchema from "../schemas/userIdSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import { Result } from "../interfaces/interfaces.d";

const getMyPage = async (req: CustomAuthRequest, res: Response) => {
  try {
    const userId = userIdSchema.parse(req.userId);

    const results = (await getUserHistoryById(
      userId,
      resultsCollection
    )) as Result[];
    const validatedResults = userHistoryDataListSchema.parse(results);
    res.status(200).json(validatedResults);
  } catch (error) {
    res.status(500).json({ error: "Failed to get results" });
    console.error("Failed to get results", error);
  }
};

export default getMyPage;
