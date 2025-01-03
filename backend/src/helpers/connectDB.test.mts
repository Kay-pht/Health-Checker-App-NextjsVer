import { Collection, MongoClient } from "mongodb";
import { connectToDatabase } from "./connectDB.mjs";
import { jest } from "@jest/globals";

jest.mock("mongodb");

// configEnv モジュールをモック
jest.mock("../configEnv.mjs", () => ({
  default: {
    mongoUri: "mongodb://mock-uri",
  },
}));

describe("connectToDatabase", () => {
  jest.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("Process Exit ");
  });
});
beforeEach(() => {
  jest.clearAllMocks(); // 各テストケースの前にモックをクリア
});

it("should connect to MongoDB successfully", async () => {
  const mockCollection: Partial<Collection> = {
    // Collection メソッドのモックを必要に応じて追加
  };
  const mockDb = {
    collection: jest.fn().mockReturnValue(mockCollection),
  };
  const mockClient = {
    db: jest.fn().mockReturnValue(mockDb),
    connect: jest.fn(),
    close: jest.fn(),
  };
  // MongoClient の connect メソッドをモック化
  jest
    .spyOn(MongoClient.prototype, "connect")
    .mockImplementation(() => Promise.resolve(mockClient as any));

  // connectToDatabase を実行
  const result = await connectToDatabase();

  expect(MongoClient.prototype.connect).toHaveBeenCalled();
  // TODO:implement the following test
  // expect(mockClient.db).toHaveBeenCalledWith("food_health_check");
  // expect(mockDb.collection).toHaveBeenCalledWith("results");
  // expect(result).toEqual({
  //   client: mockClient,
  //   resultsCollection: mockCollection,
  // });
});

it("should throw an error if unable to connect to MongoDB", async () => {
  // MongoClient の connect メソッドをモック化
  jest
    .spyOn(MongoClient.prototype, "connect")
    .mockImplementation(() =>
      Promise.reject(new Error("Failed to connect to MongoDB"))
    );

  // connectToDatabase を実行
  try {
    await connectToDatabase();
  } catch {
    expect(MongoClient.prototype.connect).toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  }
});
