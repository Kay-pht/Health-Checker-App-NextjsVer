import { fetchHistoryData } from "@/services/api";
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
