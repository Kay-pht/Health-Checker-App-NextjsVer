import { jest } from "@jest/globals";
import { getChatCompletion } from "./openAI.mjs";

describe("getChatCompletion", () => {
  // TODO:modify any type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let openai: any;

  const orderedAnswers = { question1: "answer1" };

  it("should return the AI's response when successful", () => {});

  beforeEach(() => {
    jest.clearAllMocks();
    openai = {
      chat: {
        completions: {
          create: jest.fn(),
        },
      },
    };
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  it("should return the AI's response when successful", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "This is a test response",
          },
        },
      ],
    };

    openai.chat.completions.create.mockResolvedValue(mockResponse);

    const response = await getChatCompletion(orderedAnswers, openai);

    expect(response).toBe("This is a test response");
  });

  it("should throw an error when the response from the AI is null", async () => {
    openai.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: null } }],
    });

    await expect(getChatCompletion(orderedAnswers, openai)).rejects.toThrow(
      "No response from OpenAI"
    );
  });

  it("should throw an error when the AI request fails", async () => {
    openai.chat.completions.create.mockRejectedValue(
      new Error("AI request failed")
    );

    await expect(getChatCompletion(orderedAnswers, openai)).rejects.toThrow(
      "AI request failed"
    );
  });
});
