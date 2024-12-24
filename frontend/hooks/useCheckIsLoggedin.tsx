import { verifyToken } from "@/services/api";
import {
  auth,
  getToken,
  logOut,
  saveTokenInStorage,
} from "@/services/firebase";
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
      await getToken(user);
      await saveTokenInStorage(user);
      await verifyToken();
      router.push(loginPath);
    } catch (error) {
      alert("Error verifying user, please log in again.");

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
    } else {
      verifyUser(user);
    }
    //pathとrouterを依存配列から除外
  }, [user]);

  const verifyUser = async (user: User) => {
    try {
      await getToken(user);
      await saveTokenInStorage(user);
      await verifyToken();
    } catch (error) {
      alert("Error verifying user, please log in again.");
      console.error("Error verifying user:", error);
      await logOut();
      return;
    }
  };
};
