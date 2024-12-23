export const dynamic = "force-dynamic";

import { Box, CircularProgress } from "@mui/material";
import TopBar from "../../../components/TopBar";
import CautionInResult from "../../../components/CautionInResult";
import FocusTopPageHandler from "@/components/handlersComp/FocusTopPageHandler";
import UserIsLoggedinHandler from "@/components/handlersComp/UserIsLoggedinHandler";
import { fetchUserLatestResult } from "@/services/fetchFromBackend";

// 診断結果ページ
const ResultPage = async ({ params }: { params: { resultId: string } }) => {
  const { resultId } = await params;
  const result = await fetchUserLatestResult(resultId);

  return (
    <div>
      <UserIsLoggedinHandler />
      <FocusTopPageHandler />
      <TopBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
          {result ? (
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
          ) : (
            <div>
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
              <p className="text-lg text-gray-500">Loading...</p>
            </div>
          )}
          <CautionInResult />
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
