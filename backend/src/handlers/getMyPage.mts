import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getUserHistoryById } from "../service/mongoDB.mjs";
import userHistoryDataListSchema from "../schemas/userHistoryDataListSchema.mjs";
import userIdSchema from "../schemas/userIdSchema.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import { Result } from "../interfaces/interfaces.d";
import { ZodError } from "zod";
import { MongoError } from "mongodb";

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
    if (error instanceof ZodError) {
      // userIdがSchemaにマッチしない場合は401を返す
      res.status(401).json({ error: "Unauthorized", details: error.errors });
    } else if (error instanceof MongoError) {
      res.status(500).json({ error: "Failed to fetch results" });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
    console.error("Failed to get results", error);
  }
};

export default getMyPage;
