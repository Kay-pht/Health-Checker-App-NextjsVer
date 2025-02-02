import {
  fetchHistoryData,
  fetchResult,
  postAnswersFunc,
  verifyToken,
} from "@/services/api";
import { jest } from "@jest/globals";

jest.mock("whatwg-fetch");
const token = "sampleToken";

describe("fetchHistoryData", () => {
  let resContent: object;
  let responseStatus: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: responseStatus,
          json: () => Promise.resolve(resContent),
        } as Response)
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should fetch history data", async () => {
    resContent = { sample: "data" };
    responseStatus = true;
    const result = await fetchHistoryData(token);
    expect(result).toEqual(resContent);
  });

  it("should throw an error if the response is not ok", async () => {
    resContent = { sample: "data" };
    responseStatus = false;
    await expect(fetchHistoryData(token)).rejects.toThrow(
      "Failed to fetch data from the server"
    );
  });
});

describe("fetchResult", () => {
  const resContent = { sample: "data" };
  const resultId = "sample Id";
  let responseStatus: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: responseStatus,
          json: () => Promise.resolve(resContent),
        } as Response)
    );
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should fetch analyzed data", async () => {
    responseStatus = true;
    const result = await fetchResult(token, resultId);
    expect(result).toEqual(resContent);
  });

  it("should throw an error if the response is not ok", async () => {
    responseStatus = false;
    await expect(fetchResult(token, resultId)).rejects.toThrow(
      "Failed to fetch data from the server"
    );
  });
});

describe("postAnswersFunc", () => {
  const resContent = { sample: "data" };
  const validatedUserAnswer = {
    content: {
      question1: "answer1",
    },
  };
  let responseStatus: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: responseStatus,
          json: () => Promise.resolve(resContent),
        } as Response)
    );
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should post user an answer", async () => {
    responseStatus = true;
    const result = await postAnswersFunc({ token, validatedUserAnswer });
    const json = await result.json();
    expect(json).toEqual(resContent);
  });

  it("should throw an error if the response is not ok", async () => {
    responseStatus = false;
    await expect(
      postAnswersFunc({ token, validatedUserAnswer })
    ).rejects.toThrow("Failed to fetch data from the server");
  });
});

describe("postAnswersFunc", () => {
  const resContent = { sample: "data" };
  const validatedUserAnswer = {
    content: {
      question1: "answer1",
    },
  };
  let responseStatus: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: responseStatus,
          json: () => Promise.resolve(resContent),
        } as Response)
    );
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should post user an answer", async () => {
    responseStatus = true;
    const result = await postAnswersFunc({ token, validatedUserAnswer });
    const json = await result.json();
    expect(json).toEqual(resContent);
  });

  it("should throw an error if the response is not ok", async () => {
    responseStatus = false;
    await expect(
      postAnswersFunc({ token, validatedUserAnswer })
    ).rejects.toThrow("Failed to fetch data from the server");
  });
});

describe("verifyToken", () => {
  const resContent = { sample: "data" };
  let responseStatus: boolean;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(
      (): Promise<Response> =>
        Promise.resolve({
          ok: responseStatus,
          json: () => Promise.resolve(resContent),
        } as Response)
    );
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should verify token", async () => {
    responseStatus = true;
    const result = await verifyToken(token);
    const json = await result.json();
    expect(json).toEqual(resContent);
  });

  it("should throw an error if the response is not ok", async () => {
    responseStatus = false;
    await expect(verifyToken(token)).rejects.toThrow("Failed to verify token");
  });
});
