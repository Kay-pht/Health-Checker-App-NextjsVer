import { z } from "zod";
import envSchema, { envSchemaType } from "../schemas/envSchema.mjs";
import { UserAnswer } from "../schemas/userAnswerSchema.mjs";
import { ChatCompletionMessageParam } from "openai/resources";

//TODO: specify the type of the decoded service account key
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

// Validate environment variables and if they are not correct, exit the process
export const getVerifiedEnv = (config: {}): envSchemaType => {
  try {
    //
    return envSchema.parse(config);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Invalid environment variables:");
      // error.errors を一つずつ出力する
      error.errors.forEach((err) => {
        console.error(err);
      });
    } else {
      console.error("Unexpected error:", error);
    }

    process.exit(1);
  }
};

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
