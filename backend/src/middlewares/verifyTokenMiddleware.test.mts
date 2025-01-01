import { CustomAuthRequest } from "../interfaces/interfaces";
import { verifyTokenMiddleware } from "./verifyTokenMiddleware.mjs";
import { Response, NextFunction } from "express";
import { jest } from "@jest/globals";

// Error case tests
describe("verifyTokenMiddleware for error cases", () => {
  let req: CustomAuthRequest;
  let res: Response;
  let next: NextFunction;
  // initialize arguments for each test
  beforeEach(() => {
    req = { headers: {} } as CustomAuthRequest;
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
    next = jest.fn();
  });
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should throw an error due to the lack of token in request", async () => {
    req.headers.authorization = "";
    await verifyTokenMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw an error due to the invalid token", async () => {
    req.headers.authorization = "Bearer:invalidToken";
    await verifyTokenMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it("should throw an error due to the expired token", async () => {
    req.headers.authorization =
      "Bearer:eyJhbGciOiJSUzI1NiIsImtpZCI6ImE3MWI1MTU1MmI0ODA5OWNkMGFkN2Y5YmZlNGViODZiMDM5NmUxZDEiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoia2VkIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2hlYWx0aHktY2hlY2tlci1hcHAiLCJhdWQiOiJoZWFsdGh5LWNoZWNrZXItYXBwIiwiYXV0aF90aW1lIjoxNzM1MzAzOTI3LCJ1c2VyX2lkIjoiS21FeTRzREFIQ05lY0JuaDNwZmN3eDlRVkFaMiIsInN1YiI6IkttRXk0c0RBSENOZWNCbmgzcGZjd3g5UVZBWjIiLCJpYXQiOjE3MzUzODkwMDAsImV4cCI6MTczNTM5MjYwMCwiZW1haWwiOiJ1c2VyN0BleGFtcGxlLmNvIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInVzZXI3QGV4YW1wbGUuY28iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.lFmnoPYc2EiEwIx869CpLdmqhFrDSndW5FFxlnFmbyU75nU8oO2er8GZIrAnrtgjs8n7yjsRE80KSGIWCOA-V3QFGdAYBpanrr6yNMClfh3PyWuS4DarTXvNkAJjjzOvgKzjK5Fd8NKjwyjUJ4lmbMThrgG-W_EworOEcCY6DF8yhSLUlNhhL0K4um06c1ANH1-ol2CbvVdE3hLGRGueDxJ_zv3IxjpBYua71sylhed6HFvcAyNRFkzeUWMBNFJ6hWCLTutK-6QUN4z3K-J-Ld0bcOGnFDnByc2n0B8zFiPkCJ4Wllz-krlQkICP6fYYZw5JZ8-xH1Eo_ZiRfC6Q9g"; // This is an expired token for testing purpose.
    await verifyTokenMiddleware(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });
});

// jest.mock("firebase-admin", () => ({
//   auth: jest.fn(),
// }));

// TODO: success test case
// jest.mock("firebase-admin", () => {
//   return {
//     auth: jest.fn(),
//   };
// });

// describe("verifyTokenMiddleware", () => {
//   const email = "mocked-email@example.com";
//   const user = { email, username: "mocked-username" };
//   let req: CustomAuthRequest;
//   let res: Response;
//   let next: NextFunction;
//   let mockedAuth: jest.Mock;
//   let mockVerifyIdToken: jest.Mock;
//   let mockUserService: { findByUsername: jest.Mock }; // mock userService
//   let testInstance: typeof verifyTokenMiddleware;

//   beforeEach(() => {
//     mockedAuth = auth as jest.Mock;
//     mockVerifyIdToken = jest.fn();
//     mockedAuth.mockReturnValue({
//       verifyIdToken: mockVerifyIdToken,
//     });
//     req = { headers: {} } as CustomAuthRequest;
//     res = {
//       status: jest.fn().mockReturnThis(),
//       json: jest.fn(),
//     } as unknown as Response;
//     next = jest.fn();
//     mockUserService = {
//       findByUsername: jest.fn(),
//     };

//     testInstance = new verifyTokenMiddleware(req, res, next);
//   });

//   test("should return user info when pass correct payload", async () => {
//     const payload = "mocked-payload";

//     mockVerifyIdToken.mockResolvedValue({ email });
//     mockUserService.findByUsername.mockResolvedValue(user);

//     const result = await testInstance.verifyTokenMiddleware(payload);

//     expect(result).toBe(user);
//     expect(mockVerifyIdToken).toHaveBeenCalledWith(payload, true);
//     expect(mockUserService.findByUsername).toHaveBeenCalledWith(email);
//   });
// });

// Success case test
// 修正箇所: verifyIdTokenの型を関数のシグネチャに変更
// jest.mock("firebase-admin", () => ({
//   auth: () => ({
//     verifyIdToken: jest.fn().mockResolvedValue({
//       uid: "test-uid",
//     } as DecodedIdToken),
//   }),
// }));

// describe("verifyTokenMiddleware", () => {
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

//     await verifyTokenMiddleware(req, res, next);

//     expect(req.userId).toBe(mockUid);
//     expect(next).toHaveBeenCalled();
//   });
// });

// describe("verifyTokenMiddleware for success case", () => {
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
