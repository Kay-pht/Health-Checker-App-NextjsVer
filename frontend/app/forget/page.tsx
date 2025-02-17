"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Alert, TextField } from "@mui/material";
import TopBar from "../../components/TopBar";
import useFormValidation from "../../hooks/useFormValidation";
import { ForgetFormValues } from "../../interfaces/interfaces";
import { forgetValidationSchema } from "../../schemas/authSchema";
import { useCheckIsLoggedin } from "@/hooks/useCheckIsLoggedin";
import { sendEmail } from "@/services/auth";

const ForgetPasswordPage = () => {
  useCheckIsLoggedin("/questionnaire");

  const [message, setMessage] = useState("");
  // フォームのバリデーションチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation<ForgetFormValues>(forgetValidationSchema);

  // パスワードリセットメールを送信
  const onSubmit = async (data: ForgetFormValues) => {
    try {
      await sendEmail(data);
      setMessage("パスワードリセットメールを送信しました。");
      console.log("Password reset email sent successfully!");
    } catch (error) {
      alert(`Error sending email: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <TopBar />
      <div className="flex flex-col text-gray-700 items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            パスワードの再設定
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 mt-3">
              <TextField
                type="email"
                id="email"
                label="Eメール"
                {...register("email")}
                className="w-full p-2 border border-gray-300 rounded mb-1"
                autoFocus
              />
              {errors.email && (
                <Alert severity="error" className="text-red-600 text-sm mb-2">
                  {errors.email?.message as React.ReactNode}
                </Alert>
              )}
              <p className="text-green-500">{message}</p>
            </div>

            <div className="flex flex-col items-center">
              <button
                type="submit"
                className="w-full p-2 text-lg font-bold bg-blue-600 text-white rounded mt-2 hover:bg-blue-700 transition transform hover:scale-105"
              >
                送信
              </button>
              <p className="mt-4">
                アカウントをお持ちでない場合は
                <Link href="/register" className="text-blue-600 font-semibold">
                  新規登録
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
