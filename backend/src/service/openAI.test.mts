import { jest } from "@jest/globals";
import { getChatCompletion } from "./openAI.mjs";

describe("getChatCompletion", () => {
  // TODO:modify any type
  let openai: any;

  const orderedAnswers = { question1: "answer1" };

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

    const response = await getChatCompletion(openai, orderedAnswers);

    expect(response).toBe("This is a test response");
  });

  it("should throw an error when the response from the AI is null", async () => {
    openai.chat.completions.create.mockResolvedValue({
      choices: [{ message: { content: null } }],
    });

    await expect(getChatCompletion(openai, orderedAnswers)).rejects.toThrow(
      "Failed to connect to OpenAI: No response from OpenAI"
    );
  });

  it("should throw an error when the AI request fails", async () => {
    openai.chat.completions.create.mockRejectedValue(
      new Error("AI request failed")
    );

    await expect(getChatCompletion(openai, orderedAnswers)).rejects.toThrow(
      "Failed to connect to OpenAI: AI request failed"
    );
  });
});
