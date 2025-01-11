const ERROR_MESSAGES = {
  RESULT_NOT_FOUND: {
    code: "RESULT_NOT_FOUND",
    message: "診断結果が見つかりませんでした。",
  },
  UNAUTHORIZED_ACCESS: {
    code: "UNAUTHORIZED_ACCESS",
    message: "アクセスが許可されていません。",
  },
  DB_DATA_SCHEMA_ERROR: {
    code: "DB_DATA_SCHEMA_ERROR",
    message: "データベースのデータ形式が不正です。",
  },
  USER_ID_SCHEMA_ERROR: {
    code: "USER_ID_SCHEMA_ERROR",
    message: "ユーザーIDの形式が不正です。",
  },
  RESULT_ID_SCHEMA_ERROR: {
    code: "RESULT_ID_SCHEMA_ERROR",
    message: "診断結果IDの形式が不正です。",
  },
  USER_ANSWER_SCHEMA_ERROR: {
    code: "USER_ANSWER_SCHEMA_ERROR",
    message: "回答の形式が不正です。",
  },
  RESPONSE_NOT_FOUND: {
    code: "RESPONSE_NOT_FOUND",
    message: "レスポンスが見つかりませんでした。",
  },
  RESULT_SCHEMA_ERROR: {
    code: "RESULT_SCHEMA_ERROR",
    message: "診断結果の形式が不正です。",
  },
  DATABASE_ERROR: {
    code: "DATABASE_ERROR",
    message: "データベースエラーが発生しました。",
  },
  OPENAI_API_ERROR: {
    code: "OPENAI_API_ERROR",
    message: "OpenAI APIエラーが発生しました。",
  },
  INTERNAL_SERVER_ERROR: {
    code: "INTERNAL_SERVER_ERROR",
    message: "サーバーエラーが発生しました。",
  },
};

export default ERROR_MESSAGES;
