import { DBResultType } from "@/interfaces/interfaces";
import { fetchUserHistoryData } from "@/services/fetchFromBackend";
import { getToken } from "@/services/firebase";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";

const useFetchHistoryData = (
  user: User | null | undefined,
  loading: boolean
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<DBResultType[] | null>(null);

  useEffect(() => {
    if (loading) return;
    const fetchData = async () => {
      try {
        if (!user) {
          setIsLoading(false);
          throw new Error("User not found");
        }
        const token = await getToken(user);
        const res = await fetchUserHistoryData(token);
        setData(res);
      } catch (error) {
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
  }, [user, loading]);
  return { data, isLoading };
};

export default useFetchHistoryData;
