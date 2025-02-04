"use client";

import React from "react";
import Link from "next/link";
import { Alert, TextField } from "@mui/material";
import { useCheckIsLoggedin } from "@/hooks/useCheckIsLoggedin";
import useFormValidation from "@/hooks/useFormValidation";
import { loginValidationSchema, UserAuth } from "@/schemas/authSchema";
import TopBar from "@/components/TopBar";
import LogInWithGoogleButton from "@/components/buttons/LogInWithGoogleButton";
import { loginUser } from "@/services/auth";
import AnonymousLoginButton from "@/components/buttons/AnonymousLoginButton";

// ログインページ
const LoginPage = () => {
  useCheckIsLoggedin("/questionnaire");

  // フォームのバリデーションチェック
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormValidation<UserAuth>(loginValidationSchema);

  // 入力情報(メアド・パスワード)をfirebaseで確認
  const onSubmit = async (data: UserAuth) => {
    try {
      await loginUser(data);
      console.log("User logged in successfully!");
    } catch (error) {
      alert(`Error logging in: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <TopBar />
      <div className="flex flex-col text-gray-700 items-center justify-center min-h-screen font-sans bg-gray-100">
        <div className="bg-white p-8 pb-5 pt-3 m-10 rounded-lg shadow-md w-full max-w-lg">
          <h1 className="text-2xl font-bold text-center ">ログインする</h1>
          <p className="text-sm text-center mt-1">
            ログインするとこれまでの診断結果がチェックできます
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col  items-center"
          >
            <div style={{ width: "90%" }}>
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
                  <Alert severity="error" className="text-red-600 text-sm mb-1">
                    {errors.email?.message as React.ReactNode}
                  </Alert>
                )}
              </div>

              <div className="mb-3 mt-3">
                <TextField
                  type="password"
                  id="password"
                  label="パスワード"
                  {...register("password")}
                  className="w-full p-2 border border-gray-300 rounded mb-1"
                  autoComplete="current-password"
                />
                {errors.password && (
                  <Alert severity="error" className="text-red-600 text-sm mb-1">
                    {errors.password?.message as React.ReactNode}
                  </Alert>
                )}
              </div>
            </div>
            <div className="flex flex-col  items-center">
              <div style={{ width: "65%" }}>
                <button
                  type="submit"
                  className="w-full p-2 text-lg font-bold bg-blue-600 text-white rounded mt-2 hover:bg-blue-700 transition transform hover:scale-105"
                >
                  ログイン
                </button>
                <LogInWithGoogleButton register={false} />
                <AnonymousLoginButton register={false} />
              </div>
              <p className="mt-4">
                新規登録は
                <Link href="/register" className="text-blue-600 font-semibold">
                  こちら
                </Link>
              </p>
              <p>
                パスワードを忘れた方は
                <Link href="/forget" className="text-blue-600 font-semibold">
                  こちら
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
