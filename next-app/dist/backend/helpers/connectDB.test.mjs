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
import { connectToDatabase, resultsCollection } from "./connectDB.mjs";
import configEnv from "../configEnv.mjs";
const { mongoUri } = configEnv;
describe("connectToDatabase", () => {
    let clientTest;
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        if (clientTest) {
            yield clientTest.close();
        }
    }));
    it("should connect to MongoDB successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        clientTest = new MongoClient(mongoUri || "");
        yield connectToDatabase();
        expect(resultsCollection.collectionName).toBe("results");
    }));
    it("should log an error if unable to connect to MongoDB", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidUri = "mongodb://invalid_uri";
        clientTest = new MongoClient(invalidUri);
        try {
            yield clientTest.connect();
        }
        catch (error) {
            const err = error;
            expect(err).toBeDefined();
            expect(err.message).toContain("failed to connect");
        }
        finally {
            if (clientTest) {
                yield clientTest.close();
            }
        }
    }));
});
