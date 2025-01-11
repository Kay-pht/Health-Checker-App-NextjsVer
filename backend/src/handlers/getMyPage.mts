import { Response } from "express";
import { CustomAuthRequest } from "../interfaces/interfaces.js";
import { getUserHistoryById } from "../service/mongoDB.mjs";
import { resultsCollection } from "../helpers/connectDB.mjs";
import { Result } from "../interfaces/interfaces.d";
import handleErrors from "../helpers/handleErrors.mjs";
import {
  validateHistoryDataList,
  validateUserId,
} from "../helpers/validateSchemaFunc.mjs";

const getMyPage = async (req: CustomAuthRequest, res: Response) => {
  try {
    const userId = validateUserId(req.userId);
    const results = (await getUserHistoryById(
      userId,
      resultsCollection
    )) as Result[];
    const validatedResults = validateHistoryDataList(results);

    res.status(200).json(validatedResults);
  } catch (error) {
    // ?:resを下位の関数にまで渡してよいのか?
    // possible errors are below:
    // - UserIdSchemaError (401 Unauthorized)
    // - DbDataSchemaError (500 Internal Server Error)
    // - MongoError (500 Internal Server Error)
    // - Generic Error (500 Internal Server Error)
    // - Unexpected errors (500 Internal Server Error)
    const { statusCode, body } = handleErrors(error);
    res.status(statusCode).json(body);
    console.error("Failed to get a history", error);

    // TODO:a below error handling should be erased after tests
    // if (error instanceof DbDataSchemaError) {
    //   res
    //     .status(500)
    //     .json({ error: "Database Data Error", details: error.message });
    // } else if (error instanceof UserIdSchemaError) {
    //   // userIdがSchemaにマッチしない場合は401を返す
    //   res.status(401).json({ error: "Unauthorized", details: error.message });
    // } else if (error instanceof MongoError) {
    //   res.status(500).json({ error: "Database Error", details: error.message });
    // } else {
    //   res.status(500).json({
    //     error: "Internal Server Error",
    //     details: "An unexpected error occurred",
    //   });
    // }
  }
};

export default getMyPage;
