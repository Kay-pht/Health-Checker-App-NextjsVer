import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
  User,
  sendPasswordResetEmail,
  GoogleAuthProvider,
} from "firebase/auth";
import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// JWTを取得
export const getToken = async (user: User) => {
  try {
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw new Error("Failed to get token");
  }
};

// メアド&パスワードでアカウント新規作成する用の関数
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: name,
    });
    await sendEmailVerification(user);
    console.log("User signed up successfully with name!");
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
    alert(
      `Error creating user: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
    await logOut();
    throw new Error("Failed to create user");
  }
};

// メアド&パスワードでログインする用の関数
export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const user = userCredential.user;

    console.log("User logged in successfully!");
    return user;
  } catch (error) {
    if (error instanceof Error) {
      await logOut();
      alert(`Error creating user: ${error.message}`);
    } else {
      await logOut();

      alert("An unknown error occurred.");
    }
    throw error;
  }
};
// ゲスト(匿名)でログイン(サインアップ)する用の関数
export const logInWithAnonymous = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    const user = userCredential.user;
    console.log("Anonymous user logged in successfully!");

    return user;
  } catch (error) {
    console.error("Error logging in anonymously:", error);
    await logOut();
    alert(
      `Error logging in anonymously: ${
        error instanceof Error ? error.message : "An unknown error occurred."
      }`
    );
  }
};
// ログアウト用の関数
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// パスワード忘れた場合の再設定用の関数
export const submitPasswordResetEmail = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error creating user: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};
