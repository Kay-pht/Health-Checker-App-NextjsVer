/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  testEnvironmentOptions: {
    NODE_ENV: "development",
  },
  moduleFileExtensions: ["js", "mjs", "ts", "mts", "json", "node"],
  testMatch: [
    "**/__tests__/**/*.?(m)[jt]s?(x)",
    "**/?(*.)+(spec|test).?(m)[tj]s?(x)",
  ],
  resolver: "./mjs-resolver.cjs",
  transform: {
    "^.+\\.m?tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};
