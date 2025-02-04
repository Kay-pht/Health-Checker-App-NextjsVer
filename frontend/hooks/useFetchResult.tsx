import { ResultType } from "@/interfaces/interfaces";
import { fetchUserLatestResult } from "@/services/fetchFromBackend";
import { getToken } from "@/services/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

const useFetchResult = (
  user: User | null | undefined,
  loading: boolean,
  resultId: string | string[] | undefined
) => {
  const [result, setResult] = useState<ResultType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      try {
        if (!user) {
          setIsLoading(false);
          throw new Error("User not found");
        }
        if (!resultId || typeof resultId !== "string") {
          setIsLoading(false);
          throw new Error("Result not found");
        }
        const token = await getToken(user);
        const res = await fetchUserLatestResult(resultId, token);
        setResult(res);
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error instanceof Error) {
          alert(`Error fetching data: ${error.message}`);
        } else {
          alert("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user, loading, resultId]);

  return { result, isLoading };
};

export default useFetchResult;
