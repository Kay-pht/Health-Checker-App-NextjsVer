import { FetchAnswersFromAIType } from "../interfaces/interfaces";
import { getStoredToken } from "../services/firebase";
import { postAnswersFunc } from "../services/api";
import { useRouter } from "next/navigation";

//ユーザー回答をバックエンドに投げて、AIによる診断結果(レス)を表示するフック
const useAIAnswerFetcher = () => {
  const router = useRouter();

  const fetchAnswer = async ({ e, userAnswers }: FetchAnswersFromAIType) => {
    e.preventDefault();
    const submittedAnswer = { content: userAnswers };

    // セッションストレージからトークンを取得
    const token = getStoredToken();

    // 回答を送信し、診断結果をレスとして受け取る
    const response = await postAnswersFunc({ token, submittedAnswer });
    const { resultId } = await response.json();
    router.push(`/result/${resultId}`);
  };
  return fetchAnswer;
};

export default useAIAnswerFetcher;
