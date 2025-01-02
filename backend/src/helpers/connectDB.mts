import configEnv from "../configEnv.mjs";
import { MongoClient } from "mongodb";
import { Collection } from "mongodb";
import { Result } from "../interfaces/interfaces.d";

const { mongoUri } = configEnv;

// MongoDBの公式SDKを使用してDB接続する
const client = new MongoClient(mongoUri);
let resultsCollection: Collection<Result>;

async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("food_health_check");
    resultsCollection = db.collection("results");
    console.log("Connected to MongoDB");
    return client;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export { resultsCollection, connectToDatabase };
