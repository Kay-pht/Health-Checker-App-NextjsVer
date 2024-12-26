import { ChatCompletionMessageParam } from "openai/resources";
import configEnv from "../configEnv.mjs";

const prompt = (answers: {
  [key: string]: string | null;
}): ChatCompletionMessageParam[] => {
  return [
    {
      role: "system",
      content: configEnv.taskPrompt || "assistant",
    },
    {
      role: "user",
      content: configEnv.rolePrompt || "hello",
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
export default prompt;
