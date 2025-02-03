import { UserAuth } from "@/schemas/authSchema";
import {
  logInWithEmailAndPassword,
  logOut,
  signUpWithEmailAndPassword,
  submitPasswordResetEmail,
} from "./firebase";
import { ForgetFormValues, RegisterFormValues } from "@/interfaces/interfaces";

// ログイン
export const loginUser = async (data: UserAuth) => {
  try {
    await logInWithEmailAndPassword(data.email, data.password);
    console.log("User logged in successfully!");
  } catch (error) {
    await logOut();
    if (error instanceof Error) {
      alert(`Error logging in: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// 新規登録
export const registerUser = async (data: RegisterFormValues) => {
  try {
    await signUpWithEmailAndPassword(data.email, data.password, data.name);
    console.log("User signed up successfully with name!");
  } catch (error) {
    await logOut();
    if (error instanceof Error) {
      alert(`Error creating user:  ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};

// Eメールを忘れた場合
export const sendEmail = async (data: ForgetFormValues) => {
  try {
    await submitPasswordResetEmail(data.email);
    console.log("Password reset email sent successfully!");
  } catch (error) {
    if (error instanceof Error) {
      alert(`Error sending email in: ${error.message}`);
    } else {
      alert("An unknown error occurred.");
    }
  }
};
