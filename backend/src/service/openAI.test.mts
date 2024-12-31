import { jest } from "@jest/globals";
import { getChatCompletion } from "./openAI.mjs";
import OpenAI from "openai";
import prompt from "../helpers/prompt.mjs";
import { ChatCompletionCreateParamsNonStreaming } from "openai/resources";

// モックをファイルの先頭に移動
jest.mock("openai");
jest.mock("../helpers/prompt.mjs", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const orderedAnswers = {
  question1: "Answer1",
  question2: "Answer2",
  question3: "Answer3",
};

// const openAi = jest.mock("openai", () => ({
//   OpenAI: jest.fn().mockImplementation(() => {
//     return {
//       chat: {
//         completions: {
//           create: jest.fn(),
//         },
//       },
//     };
//   }),
// }));

describe("getChatCompletion", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the response from OpenAI when the request is successful", async () => {
    const mockResponse: OpenAI.Chat.Completions.ChatCompletion = {
      choices: [
        {
          message: {
            content: "Test response from OpenAI",
            role: "assistant",
            refusal: "",
          },
          finish_reason: "stop",
          index: 0,
          logprobs: null,
        },
      ],
      id: "chatcmpl-123",
      object: "chat.completion",
      created: 1677652288,
      model: "gpt-3.5-turbo-0613",
      usage: {
        prompt_tokens: 9,
        completion_tokens: 12,
        total_tokens: 21,
      },
    };
    // const openAi = new OpenAI();
    // (openAi.chat.completions.create as jest.Mock).mockResolvedValueOnce(
    //   mockResponse
    // );
    // (prompt as jest.MockedFunction<typeof prompt>).mockReturnValue(
    //   "mocked prompt" as any
    // );

    const mockMessages: ChatCompletionCreateParamsNonStreaming["messages"] = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "mocked prompt" },
    ];

    const mockCreate = jest
      .fn<() => Promise<OpenAI.Chat.Completions.ChatCompletion>>()
      .mockResolvedValue(mockResponse);

    const mockOpenAI = {
      chat: {
        completions: {
          create: mockCreate,
        },
      },
    };

    // OpenAI コンストラクタ関数をモック化
    jest.mock("openai", () => ({
      __esModule: true, // ESモジュールとして扱うために必要
      default: jest.fn().mockImplementation(() => mockOpenAI),
    }));

    // prompt 関数をモック化
    jest.mock("../helpers/prompt.mjs", () => ({
      __esModule: true,
      default: jest.fn().mockReturnValue(mockMessages),
    }));

    const response = await getChatCompletion(new OpenAI(), orderedAnswers);
    expect(response).toEqual("Test response from OpenAI");
    expect(OpenAI.prototype.chat.completions.create).toHaveBeenCalledWith({
      model: "gpt-4o-mini",
      temperature: 0,
      messages: prompt(orderedAnswers),
    });
  });
  // it("should throw an error due to the chatGPT problem", async () => {
  //   const createSpy = jest
  //     .spyOn(OpenAI.prototype.chat.completions, "create")
  //     .mockRejectedValueOnce(new Error("Test error"));
  //   await expect(getChatCompletion(openAi, orderedAnswers)).rejects.toThrow(
  //     "Test error"
  //   );
  // });
});

// describe("getChatCompletion with null response from AI", () => {
// beforeEach(() => {

//   jest.mock("openai", () => {
//     return {
//       OpenAI: jest.fn().mockImplementation(() => {
//         return {
//           chat: {
//             completions: {
//               create: jest.fn<() => Promise<any>>().mockResolvedValue({
//                 choices: [{ message: { content: null } }],
//               }),
//             },
//           },
//         };
//       }),
//     };
//   });
// });

// afterEach(() => {
//   jest.resetModules();
//   jest.restoreAllMocks();
// });

// it("should throw an error due to the null response from chatGPT", async () => {
//   // TODO: write test case

//   const { getChatCompletion } = await import("./openAI.mjs");
//   await expect(getChatCompletion(orderedAnswers)).rejects.toThrow(
//     "Invalid response from OpenAI"
//   );
// });

describe("getChatCompletion", () => {
  beforeEach(() => {
    jest.resetModules();
    jest.mock("openai", () => ({
      OpenAI: jest.fn().mockImplementation(() => ({
        chat: {
          completions: {
            create: jest.fn(),
          },
        },
      })),
    }));
  });

  afterEach(() => {
    jest.resetModules();
    jest.restoreAllMocks();
  });

  // it("should throw an error due to the null response from chatGPT", async () => {
  //   const mockCreate = jest.fn<() => Promise<any>>().mockResolvedValue({
  //     choices: [{ message: { content: null } }],
  //   });

  //   const mockOpenAI = new OpenAI() as jest.Mocked<OpenAI>;
  //   mockOpenAI.chat.completions.create = mockCreate;

  //   const { getChatCompletion } = await import("./openAI.mjs");
  //   await expect(getChatCompletion(orderedAnswers)).rejects.toThrow(
  //     "Invalid response from OpenAI"
  //   );
  // });

  it("should return an intended response with mock function", async () => {
    // TODO: write test case
  });
});

// describe("getChatCompletion", () => {
//   let mockCreate;

//   beforeEach(() => {
//     mockCreate = openai.chat.completions.create;
//     mockCreate.mockClear();
//   });

//   it("should throw an error due to the invalid key", async () => {
//     // TODO: write test case
//   });

//   it("should throw an error due to the null response from chatGPT", async () => {
//     // TODO: write test case
//   });

//   it("should return an intended response with mock function", async () => {
//     const orderedAnswers = {
//       question1: "Answer1",
//       question2: "Answer2",
//       question3: "Answer3",
//     };
//     const mockResponse: ChatCompletion = {
//       id: "chatcmpl-123",
//       object: "chat.completion",
//       created: 1677652288,
//       model: "gpt-3.5-turbo-0613",
//       choices: [
//         {
//           index: 0,
//           message: {
//             role: "assistant",
//             content: JSON.stringify({
//               missingNutrients: [
//                 "食物繊維",
//                 "ビタミンB群",
//                 "カルシウム",
//                 "ビタミンD",
//               ],
//               recommendedFoods: ["アーモンド", "ブロッコリー", "納豆", "サバ"],
//               score: 70,
//             }),
//             refusal: "none",
//           },
//           finish_reason: "stop",
//           logprobs: null,
//         },
//       ],
//       usage: {
//         prompt_tokens: 9,
//         completion_tokens: 12,
//         total_tokens: 21,
//       },
//     };
//     mockCreate.mockResolvedValueOnce(mockResponse);
//     const response = await getChatCompletion(orderedAnswers);
//   }, 20000);
// });
