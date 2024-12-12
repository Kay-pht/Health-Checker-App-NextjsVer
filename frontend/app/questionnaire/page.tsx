"use client";

import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import useAIAnswerFetcher from "../../hooks/useFetchAnswers";
import TopBar from "../../components/TopBar";
import PercentBar from "../../components/questionFormComps/PercentBar";
import QuestionBlockComp from "../../components/questionFormComps/QuestionBlockComp";
import useGetUserAnswers from "../../hooks/useGetUserAnswers";
import { useFocusTopComp } from "../../hooks/useFocusPageTop";
import usePageHandler from "../../hooks/usePageHandler";
import { ResultProps } from "../../interfaces/interfaces";
import { foodQueryPages } from "../../utils/queryData";
import UserIsLoggedinHandler from "@/components/handlersComp/UserIsLoggedinHandler";

// 質問フォームの親コンポーネント
const QuestionFormPage = ({ setAnalyzedResult }: ResultProps) => {
  //ユーザーの回答を記録するロジック
  const { userAnswers, getAnswersInEachPage } = useGetUserAnswers();

  // ページ切り替え操作のロジック
  const { currentPageNum, pageUpHandler, pageDownHandler } = usePageHandler();

  // コンポーネント変更時にスクロール位置をトップに戻すロジック
  useFocusTopComp(currentPageNum);

  //AIに回答を送信し、診断結果を受け取るロジック
  const fetchAnswers = useAIAnswerFetcher();

  return (
    <div>
      <UserIsLoggedinHandler />
      <TopBar />
      <div className="max-w-4xl mx-auto p-5 bg-gray-100 shadow-md">
        <form
          onSubmit={(e) =>
            fetchAnswers({
              e,
              userAnswers,
              setAnalyzedResult,
            })
          }
        >
          <h3 className="text-xl text-gray-700 mb-5 font-semibold text-center">
            以下の食材をどのくらいの頻度で食べるか教えてください！
          </h3>
          {currentPageNum > 1 && (
            <PercentBar percent={(currentPageNum - 1) * 20} />
          )}
          {
            //map関数でページ分け
            foodQueryPages.map(
              (foodQueryPage, index) =>
                currentPageNum === index + 1 && (
                  <QuestionBlockComp
                    key={index}
                    foodQueryPage={[...foodQueryPage]}
                    userAnswers={userAnswers}
                    getAnswersInEachPage={getAnswersInEachPage}
                    currentPageNum={currentPageNum}
                  />
                )
            )
          }
          <div className="flex justify-between items-center mt-5">
            {currentPageNum > 1 && (
              <button
                className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
                onClick={pageDownHandler}
              >
                <KeyboardDoubleArrowLeftRoundedIcon />
              </button>
            )}
            {currentPageNum === 5 && (
              <button
                className="w-24 text-center bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
                type="submit"
              >
                Finish <SendRoundedIcon fontSize="inherit" />
              </button>
            )}
            {currentPageNum !== 5 && (
              <button
                className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105 ml-auto"
                onClick={pageUpHandler}
              >
                <KeyboardDoubleArrowRightRoundedIcon />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionFormPage;
