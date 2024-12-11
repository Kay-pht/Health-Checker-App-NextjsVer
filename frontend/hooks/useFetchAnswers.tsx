import { FetchAnswersFromAIType } from "../interfaces/interfaces";
import { getStoredToken } from "../services/firebase";
import { sendAnswersFunc } from "../api/api";
import { useRouter } from "next/navigation";

//回答をバックエンドに投げて、AIによる診断結果(レス)を表示するフックス
const useAIAnswerFetcher = () => {
  const router = useRouter();

  const fetchAnswer = async ({
    e,
    userAnswers,
    setDiagnosisResult,
  }: FetchAnswersFromAIType) => {
    e.preventDefault();
    const submittedAnswer = { content: userAnswers };

    // セッションストレージからトークンを取得
    const token = getStoredToken();

    router.push("/result");

    // 回答を送信し、診断結果をレスとして受け取る
    const response = await sendAnswersFunc({ token, submittedAnswer });
    const responseData = await response.json();

    // ここで得た診断結果をResult.tsxで表示する
    setDiagnosisResult(responseData);
  };
  return fetchAnswer;
};

export default useAIAnswerFetcher;
