import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// ログインしている場合は指定パスに遷移、未ログイン時は遷移なし
export const useCheckIsLoggedin = (loginPath: string) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (user) {
      router.push(loginPath);
    }
    //pathとrouterを依存配列から除外
  }, [user]);
};

// 未ログイン時は/loginに遷移、ログイン時は遷移なし
export const useUserIsLoggedin = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
    //pathとrouterを依存配列から除外
  }, [user]);
};
