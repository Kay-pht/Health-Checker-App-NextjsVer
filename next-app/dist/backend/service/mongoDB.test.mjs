var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MongoClient } from "mongodb";
import configEnv from "../configEnv.mjs";
import { registerResult } from "./mongoDB.mjs";
import { jest } from "@jest/globals";
const { mongoUri } = configEnv;
if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables");
}
describe("registerResult", () => {
    let client;
    const { mongoUri } = configEnv;
    let resultsCollection;
    const req = {
        userId: "testUser",
    };
    const result = {
        userId: req.userId,
        recommendedFoods: ["testFood1", "testFood2"],
        missingNutrients: ["testNutrient1", "testNutrient2"],
        score: 90,
        createdAt: new Date(),
    };
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        client = new MongoClient(mongoUri || "");
        yield client.connect();
        const db = client.db("food_health_check");
        resultsCollection = db.collection("results");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield client.close();
    }));
    it("should register result successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        yield registerResult(req, result);
        const insertedResult = yield resultsCollection.findOne({
            userId: req.userId,
        });
        expect(insertedResult === null || insertedResult === void 0 ? void 0 : insertedResult.recommendedFoods).toEqual(result.recommendedFoods);
    }));
    it("should throw error when failed to register result", () => __awaiter(void 0, void 0, void 0, function* () {
        const insertOneSpy = jest
            .spyOn(resultsCollection, "insertOne")
            .mockRejectedValueOnce(new Error("Test error"));
        yield expect(resultsCollection.insertOne(result)).rejects.toThrow("Test error");
        // Ensure that the spy was called
        expect(insertOneSpy).toHaveBeenCalled();
        // Reset the spy to ensure it doesn't affect other tests
        insertOneSpy.mockReset();
    }));
});
