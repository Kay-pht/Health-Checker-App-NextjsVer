import { FetchAnswersFromAIType } from "../interfaces/interfaces";
import { getStoredToken } from "../services/firebase";
import { postAnswersFunc } from "../api/api";
import { useRouter } from "next/navigation";

//ユーザー回答をバックエンドに投げて、AIによる診断結果(レス)を表示するフック
const useAIAnswerFetcher = () => {
  const router = useRouter();

  const fetchAnswer = async ({
    e,
    userAnswers,
    setAnalyzedResult,
  }: FetchAnswersFromAIType) => {
    e.preventDefault();
    const submittedAnswer = { content: userAnswers };

    // セッションストレージからトークンを取得
    const token = getStoredToken();

    // 回答を送信し、診断結果をレスとして受け取る
    const response = await postAnswersFunc({ token, submittedAnswer });
    const responseData = await response.json();

    router.push("/result");

    // ここで得た診断結果をResult.tsxで表示する
    setAnalyzedResult(responseData);
  };
  return fetchAnswer;
};

export default useAIAnswerFetcher;
