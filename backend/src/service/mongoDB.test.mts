import { Collection, InsertOneResult, OptionalId } from "mongodb";

import { jest } from "@jest/globals";

describe("registerResult", () => {
  let resultsCollection: Partial<Collection>;
  const result = {
    userId: "testUser",
    recommendedFoods: ["testFood1", "testFood2"],
    missingNutrients: ["testNutrient1", "testNutrient2"],
    score: 90,
  };

  beforeEach(() => {
    resultsCollection = {
      insertOne: jest.fn() as jest.MockedFunction<
        (
          doc: OptionalId<Document>,
          options?: unknown
        ) => Promise<InsertOneResult<Document>>
      >,
    };
  });

  // it("should throw error when failed to register result", async () => {
  //   const userId = "testUser";
  //   const answerByChatGPT: answerByChatGPTType = {
  //     missingNutrients: ["testNutrient1", "testNutrient2"],
  //     recommendedFoods: ["testFood1", "testFood2"],
  //     score: 90,
  //   };
  //   const insertOneSpy = jest
  //     .spyOn(resultsCollection, "insertOne")
  //     .mockRejectedValueOnce(new Error("Test error"));

  //   await expect(resultsCollection.insertOne!(result)).rejects.toThrow(
  //     "Test error"
  //   );

  //   expect(registerResult(userId, answerByChatGPT)).toHaveBeenCalled(
  //     resultsCollection.insertOneSpy(result)
  //   );
  //   expect(registerResult(userId, answerByChatGPT)).toThrow(
  //     "Failed to save result"
  //   );
  //   insertOneSpy.mockReset();
  // });
});

// const { mongoUri } = configEnv;

// if (!mongoUri) {
//   throw new Error("MONGO_URI is not defined in the environment variables");
// }

// describe("registerResult", () => {
//   let client: MongoClient;
//   const { mongoUri } = configEnv;
//   let resultsCollection: Collection;
//   const result: Result = {
//     userId: "testUser",
//     recommendedFoods: ["testFood1", "testFood2"],
//     missingNutrients: ["testNutrient1", "testNutrient2"],
//     score: 90,
//     createdAt: new Date(),
//   };

//   beforeAll(async () => {
//     client = new MongoClient(mongoUri || "");
//     await client.connect();
//     const db = client.db("food_health_check");
//     resultsCollection = db.collection("results");
//   });

//   afterAll(async () => {
//     await client.close();
//     jest.resetAllMocks();
//     jest.clearAllMocks();
//   });

//   it("should throw error when failed to register result", async () => {
//     const insertOneSpy = jest
//       .spyOn(resultsCollection, "insertOne")
//       .mockRejectedValueOnce(new Error("Test error"));

//     await expect(resultsCollection.insertOne(result)).rejects.toThrow(
//       "Test error"
//     );

//     // Ensure that the spy was called
//     expect(insertOneSpy).toHaveBeenCalled();

//     // Reset the spy to ensure it doesn't affect other tests
//     insertOneSpy.mockReset();
//   });
// });
