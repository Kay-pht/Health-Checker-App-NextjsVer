import { signInWithPopup } from "firebase/auth";
import { auth, logOut, provider } from "../../services/firebase";
import { registerProps } from "../../interfaces/interfaces";

const LogInWithGoogleButton = ({ register }: registerProps) => {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      // const { user } = userCredential;
      // const token = await getToken(user);
      // await verifyToken(token);
      console.log(`logged in with Google`);
    } catch (error) {
      if (error instanceof Error) {
        await logOut();
        alert(`Error logging in: ${error.message}`);
      } else {
        await logOut();
        alert("An unknown error occurred.");
      }
    }
  };
  return (
    <button
      onClick={signInWithGoogle}
      className="w-full p-2 text-lg font-bold bg-red-500 text-white rounded mt-2 hover:bg-red-600  transition transform hover:scale-105"
    >
      {register ? "Googleで登録" : "Googleでログイン"}
    </button>
  );
};

export default LogInWithGoogleButton;
