var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { firebaseAuthMiddleware } from "./firebaseAuthMiddleware.mjs";
import { jest } from "@jest/globals";
// Error case tests
describe("firebaseAuthMiddleware for error cases", () => {
    let req;
    let res;
    let next;
    // initialize arguments for each test
    beforeEach(() => {
        req = { headers: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
    it("should throw an error due to the lack of token in request", () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = "";
        yield firebaseAuthMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    }));
    it("should throw an error due to the invalid token", () => __awaiter(void 0, void 0, void 0, function* () {
        req.headers.authorization = "Bearer:invalidToken";
        yield firebaseAuthMiddleware(req, res, next);
        expect(res.status).toHaveBeenCalledWith(403);
        expect(next).not.toHaveBeenCalled();
    }));
    it("should verify token successfully", () => __awaiter(void 0, void 0, void 0, function* () { }));
});
// TODO: write test case
// Success case test
// 修正箇所: verifyIdTokenの型を関数のシグネチャに変更
// jest.mock("firebase-admin", () => ({
//   auth: () => ({
//     verifyIdToken: jest.fn().mockResolvedValue({
//       uid: "test-uid",
//     } as DecodedIdToken),
//   }),
// }));
// describe("firebaseAuthMiddleware", () => {
//   it("should add userId to request and call next function for valid token", async () => {
//     const mockUid = "test-uid";
//     const mockToken = "Bearer:valid-token";
//     const req = {
//       headers: {
//         authorization: mockToken,
//       },
//     } as CustomAuthRequest;
//     const res = {} as Response;
//     const next = jest.fn() as NextFunction;
//     await firebaseAuthMiddleware(req, res, next);
//     expect(req.userId).toBe(mockUid);
//     expect(next).toHaveBeenCalled();
//   });
// });
// describe("firebaseAuthMiddleware for success case", () => {
//   let req: CustomAuthRequest;
//   let res: Response;
//   let next: NextFunction;
//   jest.mock("firebase-admin/auth", () => ({
//     getAuth: () => ({
//       verifyIdToken: jest.fn().mockResolvedValue({
//         uid: "testUser",
//         aud: "testAudience",
//         auth_time: 1673315837,
//         iat: 1673312237,
//         exp: 1673319037,
//         iss: "https://securetoken.google.com/testProject",
//         sub: "testUserSub",
//       } as DecodedIdToken), // 修正箇所: 型アサーションを追加
//     }),
//   }));
//   beforeEach(() => {});
// });
