import { Collection, InsertOneResult, ObjectId, OptionalId } from "mongodb";
import { jest } from "@jest/globals";
import {
  getResultById,
  getUserHistoryById,
  registerResult,
} from "./mongoDB.mjs";
import { answerByChatGPTType } from "../interfaces/interfaces";
import { Result } from "../interfaces/interfaces.d";

describe("registerResult", () => {
  let resultsCollection: jest.Mocked<Collection<Result>>;
  const result = {
    userId: "testUser",
    recommendedFoods: ["testFood1", "testFood2"],
    missingNutrients: ["testNutrient1", "testNutrient2"],
    score: 90,
    createdAt: expect.any(Date),
  };
  const userId = "testUser";
  const answerByChatGPT: answerByChatGPTType = {
    missingNutrients: ["testNutrient1", "testNutrient2"],
    recommendedFoods: ["testFood1", "testFood2"],
    score: 90,
  };

  beforeEach(() => {
    resultsCollection = {
      insertOne: jest.fn() as jest.MockedFunction<
        (
          doc: OptionalId<Result>,
          options?: unknown
        ) => Promise<InsertOneResult<Result>>
      >,
      // 他の必要なプロパティをモックする
      dbName: "testDb",
    } as jest.Mocked<Collection<Result>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should throw error when failed to register result", async () => {
    const insertOneSpy = jest
      .spyOn(resultsCollection, "insertOne")
      .mockRejectedValueOnce(new Error("Test error"));

    await expect(
      registerResult(userId, answerByChatGPT, resultsCollection)
    ).rejects.toThrow("Error registering result: Test error");
    expect(insertOneSpy).toHaveBeenCalledWith(result);
  });

  it("should return insertedId when successfully registered result", async () => {
    const insertOneSpy = jest
      .spyOn(resultsCollection, "insertOne")
      .mockResolvedValueOnce({
        insertedId: new ObjectId("676ceee230c23fc89672b337"),
        acknowledged: true,
      });

    const insertedId = await registerResult(
      userId,
      answerByChatGPT,
      resultsCollection
    );
    expect(insertedId.toString()).toBe("676ceee230c23fc89672b337");
    expect(insertOneSpy).toHaveBeenCalledWith(result);
  });
});

describe("getResultById", () => {
  let resultsCollection: jest.Mocked<Collection<Result>>;
  const result = {
    _id: new ObjectId("676ceee230c23fc89672b337"),
    userId: "testUser",
    recommendedFoods: ["testFood1", "testFood2"],
    missingNutrients: ["testNutrient1", "testNutrient2"],
    score: 90,
    createdAt: expect.any(Date),
  };
  const resultId = "676ceee230c23fc89672b337";

  beforeEach(() => {
    resultsCollection = {
      findOne: jest.fn() as jest.MockedFunction<
        (doc: OptionalId<Result>, options?: unknown) => Promise<Result | null>
      >,
      // 他の必要なプロパティをモックする
      dbName: "testDb",
    } as jest.Mocked<Collection<Result>>;
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should throw error when failed to fetch a result", async () => {
    const findOneSpy = jest
      .spyOn(resultsCollection, "findOne")
      .mockRejectedValueOnce(new Error("Test error"));

    await expect(getResultById(resultId, resultsCollection)).rejects.toThrow(
      "Error fetching a result: Test error"
    );
    expect(findOneSpy).toHaveBeenCalledWith({ _id: new ObjectId(resultId) });
  });

  it("should throw error when failed to fetch null", async () => {
    const findOneSpy = jest
      .spyOn(resultsCollection, "findOne")
      .mockResolvedValueOnce(null);

    await expect(getResultById(resultId, resultsCollection)).rejects.toThrow(
      `Error fetching a result: No result found for id: ${resultId}`
    );
    expect(findOneSpy).toHaveBeenCalledWith({ _id: new ObjectId(resultId) });
  });

  it("should return fetched result when successfully fetched", async () => {
    const findOneSpy = jest
      .spyOn(resultsCollection, "findOne")
      .mockResolvedValueOnce(result);

    const fetchedResult = await getResultById(resultId, resultsCollection);
    expect(fetchedResult).toEqual(result);
    expect(findOneSpy).toHaveBeenCalledWith({ _id: new ObjectId(resultId) });
  });
});

describe("getUserHistoryById", () => {
  let resultsCollection;
  const userId = "testUser";

  const createMockCollection = (mockResult: Result[]) => {
    const toArrayMock = jest
      .fn<() => Promise<Result[]>>()
      .mockResolvedValue(mockResult);
    const limitMock = jest.fn().mockReturnValue({ toArray: toArrayMock });
    const sortMock = jest.fn().mockReturnValue({ limit: limitMock });
    const findMock = jest.fn().mockReturnValue({ sort: sortMock });

    return {
      find: findMock,
    };
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should throw error when failed to fetch data list", async () => {
    resultsCollection = createMockCollection([]) as unknown as jest.Mocked<
      Collection<Result>
    >;
    const findSpy = jest
      .spyOn(resultsCollection, "find")
      .mockImplementationOnce(() => {
        throw new Error("Test error");
      });

    await expect(getUserHistoryById(userId, resultsCollection)).rejects.toThrow(
      "Error fetching history: Test error"
    );
    expect(findSpy).toHaveBeenCalledWith({ userId: userId });
  });

  it("should return empty array when no results are found", async () => {
    resultsCollection = createMockCollection([]) as unknown as jest.Mocked<
      Collection<Result>
    >;
    const historyData = await getUserHistoryById(userId, resultsCollection);

    expect(historyData).toEqual([]);
    expect(resultsCollection.find).toHaveBeenCalledWith({ userId: userId });
  });

  it("should return fetched result when successfully fetched", async () => {
    const result = [
      {
        userId: "testUser",
        recommendedFoods: ["testFood1", "testFood2"],
        missingNutrients: ["testNutrient1", "testNutrient2"],
        score: 90,
        createdAt: new Date(),
        _id: new ObjectId("676ceee230c23fc89672b337"),
      },
      {
        userId: "testUser2",
        recommendedFoods: ["testFood3", "testFood4"],
        missingNutrients: ["testNutrient1", "testNutrient2"],
        score: 92,
        createdAt: new Date(),
        _id: new ObjectId("676ceee230c23fc89672b338"),
      },
    ];
    resultsCollection = createMockCollection(result) as unknown as jest.Mocked<
      Collection<Result>
    >;
    const historyData = await getUserHistoryById(userId, resultsCollection);
    expect(historyData).toEqual(result);
    expect(resultsCollection.find).toHaveBeenCalledWith({ userId: userId });
  });
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
