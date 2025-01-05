import tseslint from "@typescript-eslint/eslint-plugin";
import parser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts}"],
    languageOptions: {
      parser: parser,
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-var-requires": "error",
    },
    // TODO:remove ignores key
    ignores: [
      "src/service/openAI.test.mts",
      "src/helpers/connectDB.test.mts",
      "src/server.mts",
    ],
  },
];
