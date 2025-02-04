"use client";

import { FetchAnswersFromAIType } from "../interfaces/interfaces";
import { auth, getToken } from "../services/firebase";
import { postAnswersFunc } from "../services/api";
import { useRouter } from "next/navigation";
import { resultIdSchema } from "@/schemas/resultIdSchema";
import { userAnswerSchema } from "@/schemas/userAnswerSchema";

//ユーザー回答をバックエンドに投げて、AIによる診断結果のデータidを受け取るフック
const useAIAnswerFetcher = () => {
  const router = useRouter();

  const fetchAnswer = async ({ e, userAnswer }: FetchAnswersFromAIType) => {
    e.preventDefault();

    // const submittedAnswer = { content: userAnswer };
    const validatedUserAnswer = userAnswerSchema.parse({ content: userAnswer });
    // firebaseからトークンを取得
    const user = auth.currentUser;
    const token = await getToken(user);

    // 回答を送信し、データidをレスとして受け取り、結果ページに遷移
    const response = await postAnswersFunc({ token, validatedUserAnswer });

    const { resultId } = await response.json();
    const validatedResultId = resultIdSchema.parse(resultId);

    router.push(`/result/${validatedResultId}`);
  };
  return fetchAnswer;
};

export default useAIAnswerFetcher;
