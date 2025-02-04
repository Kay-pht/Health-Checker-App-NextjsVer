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
  signInWithPopup,
} from "firebase/auth";
import { firebaseConfig } from "../config";

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

// JWTを取得
export const getToken = async (user: User | null | undefined) => {
  try {
    if (!user) {
      console.error("User not authenticated");
      throw new Error("User not authenticated");
    }
    const token = await user.getIdToken();
    return token;
  } catch (error) {
    console.error("Error getting token:", error);
    throw error;
  }
};

// メアド&パスワードでアカウント新規作成する用の関数
export const signUpWithEmailAndPassword = async (
  email: string,
  password: string,
  name: string
) => {
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
  return user;
};

// メアド&パスワードでログインする用の関数
export const logInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  const user = userCredential.user;
  return user;
};

// ゲスト(匿名)でログイン(サインアップ)する用の関数
export const logInWithAnonymous = async () => {
  await signInAnonymously(auth);
};

// Googleでログイン
export const logInWithGoogle = async () => {
  await signInWithPopup(auth, provider);
};

// ログアウト用の関数
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out successfully!");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

// パスワード忘れた場合、再設定メールを送る用の関数
export const submitPasswordResetEmail = async (email: string) => {
  await sendPasswordResetEmail(auth, email);
};
