"use client";

import { FetchAnswersFromAIType } from "../interfaces/interfaces";
import { auth, getToken } from "../services/firebase";
import { postAnswersFunc } from "../services/api";
import { useRouter } from "next/navigation";

//ユーザー回答をバックエンドに投げて、AIによる診断結果のデータidを受け取るフック
const useAIAnswerFetcher = () => {
  const router = useRouter();

  const fetchAnswer = async ({ e, userAnswers }: FetchAnswersFromAIType) => {
    e.preventDefault();
    const submittedAnswer = { content: userAnswers };

    // firebaseからトークンを取得
    const user = auth.currentUser;
    if (!user) {
      console.error("User not authenticated");
      throw new Error("User not authenticated");
    }
    const token = await getToken(user);

    // 回答を送信し、データidをレスとして受け取り、結果ページに遷移
    const response = await postAnswersFunc({ token, submittedAnswer });
    const { resultId } = await response.json();
    router.push(`/result/${resultId}`);
  };
  return fetchAnswer;
};

export default useAIAnswerFetcher;
