import { auth } from "@/services/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

const useCheckIsLoggedin = (path: string) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  if (user) {
    router.push(path);
  }
};

export default useCheckIsLoggedin;
