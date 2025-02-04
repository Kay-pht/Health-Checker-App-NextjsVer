import { registerProps } from "@/interfaces/interfaces";
import { logInAnonymously } from "@/services/auth";
import React from "react";

const AnonymousLoginButton = ({ register }: registerProps) => {
  const onClick = async () => {
    try {
      await logInAnonymously();
    } catch (error) {
      alert(`Error logging in: ${error}`);
      console.error(error);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full p-2 text-lg font-bold bg-gray-500 text-white rounded mt-2 hover:bg-gray-600 transition transform hover:scale-105"
    >
      ゲストとして
      {register ? "登録" : "ログイン"}
    </button>
  );
};

export default AnonymousLoginButton;
