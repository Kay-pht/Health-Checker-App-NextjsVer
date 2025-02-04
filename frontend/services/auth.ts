import { UserAuth } from "@/schemas/authSchema";
import {
  logInWithAnonymous,
  logInWithEmailAndPassword,
  logInWithGoogle,
  logOut,
  signUpWithEmailAndPassword,
  submitPasswordResetEmail,
} from "./firebase";
import { ForgetFormValues, RegisterFormValues } from "@/interfaces/interfaces";

// ログイン
export const loginUser = async (data: UserAuth) => {
  try {
    await logInWithEmailAndPassword(data.email, data.password);
  } catch (error) {
    await logOut();
    throw error;
  }
};

// 新規登録
export const registerUser = async (data: RegisterFormValues) => {
  try {
    await signUpWithEmailAndPassword(data.email, data.password, data.name);
  } catch (error) {
    await logOut();
    throw error;
  }
};

// Googleでログイン
export const signInWithGoogle = async () => {
  try {
    await logInWithGoogle();
  } catch (error) {
    await logOut();
    throw error;
  }
};

// ゲスト(匿名)でログイン(サインアップ)する用の関数
export const logInAnonymously = async () => {
  try {
    await logInWithAnonymous();
    console.log("Anonymous user logged in successfully!");
  } catch (error) {
    console.error("Error logging in anonymously:", error);
    await logOut();
    if (error instanceof Error) {
      alert(`Error logging in anonymously: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// Eメールを忘れた場合
export const sendEmail = async (data: ForgetFormValues) => {
  try {
    await submitPasswordResetEmail(data.email);
  } catch (error) {
    throw error;
  }
};
