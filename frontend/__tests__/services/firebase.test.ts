import { getToken } from "@/services/firebase";
import { User } from "firebase/auth";

describe("getToken", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return a token", async () => {
    const mockUser: Partial<User> = {
      getIdToken: jest.fn().mockResolvedValue("mockToken"),
    };
    const token = await getToken(mockUser as User);
    expect(token).toBe("mockToken");
    expect(mockUser.getIdToken).toHaveBeenCalled();
  });

  it("should throw an error if can't get token", () => {
    const mockUser: Partial<User> = {
      getIdToken: jest.fn().mockRejectedValue(new Error("Failed to get token")),
    };
    expect(getToken(mockUser as User)).rejects.toThrow("Failed to get token");
    expect(mockUser.getIdToken).toHaveBeenCalled();
  });
});

// describe("logOut", () => {
//   jest.mock("firebase/auth", () => ({
//     ...jest.requireActual("firebase/auth"),
//     signOut: jest.fn(),
//   }));

//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   afterAll(() => {
//     jest.restoreAllMocks();
//   });

//   it("should log out user", async () => {
//     const { signOut } = require("firebase/auth");
//     await signOut(auth);
//     expect(signOut).toHaveBeenCalled();
//     // expect(logOut).not.toThrow();
//   });
// });
