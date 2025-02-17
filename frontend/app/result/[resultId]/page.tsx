"use client";

import { Box, CircularProgress } from "@mui/material";
import TopBar from "../../../components/TopBar";
import CautionInResult from "../../../components/CautionInResult";
import ClientHandlersWrapper from "@/components/handlersComp/ClientHandlersWrapper";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/services/firebase";
import { useParams } from "next/navigation";
import useFetchResult from "@/hooks/useFetchResult";

// TODO: fetch時のエラーコードに応じて表示内容を分岐させる(switch,caseを使用する)
// 診断結果ページ
const ResultPage = () => {
  const params = useParams();
  const { resultId } = params;
  const [user, loading] = useAuthState(auth);

  const { result, isLoading } = useFetchResult(user, loading, resultId);

  return (
    <ClientHandlersWrapper>
      <div>
        <TopBar />
        <div className="p-6 bg-gray-100 min-h-screen">
          <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
            {isLoading && (
              <div>
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
                <p className="text-lg text-gray-500">Loading...</p>
              </div>
            )}
            {result && (
              <div className="result">
                <div className="font-semibold">
                  <h1 className="text-2xl font-bold  text-gray-900 mb-4 ">
                    診断結果
                  </h1>
                  <p className="text-lg mb-2 text-gray-700">
                    不足栄養素 :{" "}
                    <span className="font-bold text-red-500">
                      {result.missingNutrients.join(", ")}
                    </span>
                  </p>
                  <p className="text-lg mb-2 text-gray-700">
                    推奨食材 :{" "}
                    <span className="font-bold text-green-500">
                      {result.recommendedFoods.join(", ")}
                    </span>
                  </p>
                  <p className="text-lg text-gray-700">
                    スコア :{" "}
                    <span className="font-bold text-blue-600">
                      {result.score}
                    </span>
                  </p>
                </div>
              </div>
            )}
            <CautionInResult />
          </div>
        </div>
      </div>
    </ClientHandlersWrapper>
  );
};

export default ResultPage;
