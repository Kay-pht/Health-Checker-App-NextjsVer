import configEnv from "../configEnv.mjs";
import prompt from "./prompt.mjs";

it("returns an array of chat completion messages", () => {
  const userAnswer = { q1: "answer1", q2: "answer2" };
  expect(prompt(userAnswer)).toEqual([
    {
      role: "system",
      content: configEnv.rolePrompt,
    },
    {
      role: "user",
      content: configEnv.taskPrompt,
    },

    {
      role: "system",
      content: "指示に従い,フォーマットに沿ってすべての項目に回答します。",
    },

    {
      role: "user",
      content: JSON.stringify(userAnswer),
    },
  ]);
});
