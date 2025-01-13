import { TokenNotFoundError } from "../errors/customErrors.mjs";
import { UserAnswer } from "../schemas/userAnswerSchema.mjs";
import { ChatCompletionMessageParam } from "openai/resources";
import { authTokenSchema } from "../schemas/utilSchemas.mjs";

// decode firebase service account key as JSON
const decodeAccountKey = (serviceAccountKey: string): {} => {
  try {
    const decodedKey = Buffer.from(serviceAccountKey, "base64").toString(
      "utf-8"
    );
    return JSON.parse(decodedKey);
  } catch (error) {
    console.error("Failed to decode Firebase service account key", error);
    throw new Error("Failed to decode Firebase service account key");
  }
};

export default decodeAccountKey;

export const prompt = (
  answers: UserAnswer["content"],
  rolePrompt: string,
  taskPrompt: string
  // orderedAnswers: { [key: string]: string }
): ChatCompletionMessageParam[] => {
  return [
    {
      role: "system",
      content: rolePrompt || "assistant",
    },
    {
      role: "user",
      content: taskPrompt || "hello",
    },

    {
      role: "system",
      content: "指示に従い,フォーマットに沿ってすべての項目に回答します。",
    },

    {
      role: "user",
      content: JSON.stringify(answers),
    },
  ];
};

// リクエストヘッダーからトークンを取り出す関数
export function getTokenFromRequestHeader(
  authHeader: string | undefined
): string {
  try {
    const validatedAuthHeader = authTokenSchema.parse(authHeader);
    const idToken = validatedAuthHeader.split(":")[1];
    return idToken;
  } catch {
    console.error("No authorization header found");
    throw new TokenNotFoundError("No authorization header found");
  }
}
