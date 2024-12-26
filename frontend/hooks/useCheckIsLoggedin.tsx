import { verifyToken } from "@/services/api";
import { auth, getToken, logOut } from "@/services/firebase";
import { User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// ログインしている場合は指定パスに遷移、未ログイン時は遷移なし
export const useCheckIsLoggedin = (loginPath: string) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const verifyUser = async (user: User) => {
    try {
      const token = await getToken(user);
      await verifyToken(token);
      router.push(loginPath);
    } catch (error) {
      alert("Error verifying user, please log in again.");
      logOut();

      console.error("Error verifying user:", error);
      return;
    }
  };

  useEffect(() => {
    if (user) {
      verifyUser(user);
    }
    //pathとrouterを依存配列から除外
  }, [user]);
};

// 未ログイン時は/loginに遷移、ログイン時は遷移なし
export const useUserIsLoggedin = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      logOut();
    }
    //pathとrouterを依存配列から除外
  }, [user, loading]);

  // const verifyUser = async (user: User) => {
  //   try {
  //     const token = await getToken(user);
  //     await verifyToken(token);
  //   } catch (error) {
  //     alert("Error verifying user, please log in again.");
  //     console.error("Error verifying user:", error);
  //     await logOut();
  //     return;
  //   }
  // };
};
