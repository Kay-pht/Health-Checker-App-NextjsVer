import { MongoClient } from "mongodb";
import { Collection } from "mongodb";
import { Result } from "../interfaces/interfaces.d";
import configEnv from "../configEnv.mjs";

const client = new MongoClient(configEnv.mongoUri);
let resultsCollection: Collection<Result>;
async function connectToDatabase() {
  try {
    await client.connect();
    const db = client.db("food_health_check");
    resultsCollection = db.collection("results");
    console.log("Connected to MongoDB");
    return { client, resultsCollection };
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export { connectToDatabase, resultsCollection };
