"use client";
// export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import TopBar from "../../components/TopBar";
import { DBResultType } from "../../interfaces/interfaces";
import { fetchUserHistoryData } from "@/services/fetchFromBackend";
import ClientHandlersWrapper from "@/components/handlersComp/ClientHandlersWrapper";
import { auth } from "@/services/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const MyPage = () => {
  // const data = await fetchUserHistoryData();
  const [data, setData] = useState<DBResultType[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [user] = useAuthState(auth);
  // const user = auth.currentUser;
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      try {
        if (!user) {
          setIsLoading(false);
          throw new Error("User not found");
        }
        const res = await fetchUserHistoryData(user);
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, loading]);

  return (
    <ClientHandlersWrapper>
      <div>
        <TopBar />
        <div className="p-6 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">これまでの診断結果</h1>
          {isLoading && (
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
                    <th className="py-2 md:py-3 px-2 md:px-6 text-left">
                      日付
                    </th>
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
                        {new Date(result.createdAt).toLocaleDateString(
                          "ja-JP",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
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
    </ClientHandlersWrapper>
  );
};

export default MyPage;
