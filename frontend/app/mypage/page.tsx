import { Box, CircularProgress } from "@mui/material";
import TopBar from "../../components/TopBar";
import { DBResultType } from "../../interfaces/interfaces";
// import { logOut } from "@/services/firebase";
// import fetchUserHistoryData from "@/services/fetchUserHistoryData";
import MyPageClientSideWrapper from "@/components/MyPageClientSideWrapper";

const MyPage = async () => {
  // 過去の診断データをバックエンドから受け取る
  // const data = await fetchUserHistoryData("/api/mypage");
  const data: DBResultType[] = [
    {
      createdAt: new Date("2023-05-01"),
      score: 75,
      missingNutrients: ["ビタミンC", "鉄分"],
      recommendedFoods: ["オレンジ", "ほうれん草"],
    },
    {
      createdAt: new Date("2023-05-15"),
      score: 82,
      missingNutrients: ["カルシウム", "ビタミンD"],
      recommendedFoods: ["牛乳", "サーモン"],
    },
    {
      createdAt: new Date("2023-06-01"),
      score: 90,
      missingNutrients: ["食物繊維"],
      recommendedFoods: ["玄米", "ブロッコリー"],
    },
  ];

  // if (error) {
  //   setTimeout(async () => {
  //     await logOut();
  //     window.location.reload();
  //   }, 5000); // エラーなら5秒後にログアウト
  //   return <div>Sorry...Please Log in again</div>;
  // }

  return (
    <div>
      <MyPageClientSideWrapper />
      <TopBar />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">これまでの診断結果</h1>
        {!data && (
          <div>
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
            <p>loading...</p>
          </div>
        )}
        {data && (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm md:text-base leading-normal">
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">#</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">日付</th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                    スコア
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                    不足している栄養素
                  </th>
                  <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                    おすすめの食材
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-500 text-sm md:text-base ">
                {data.map((result: DBResultType, index: number) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 font-semibold hover:bg-gray-100"
                  >
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {index + 1}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {new Date(result.createdAt).toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {result.score}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {result.missingNutrients.join(", ")}
                    </td>
                    <td className="py-2 md:py-3 px-2 md:px-6 text-left">
                      {result.recommendedFoods.join(", ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
