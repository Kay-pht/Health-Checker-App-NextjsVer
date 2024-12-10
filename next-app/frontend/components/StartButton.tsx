"use client";

import { useRouter } from "next/navigation";

const StartButton = () => {
  const router = useRouter();

  const handleStartClick = () => {
    router.push("/login");
  };
  return (
    <button
      className="px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 hover:scale-105"
      onClick={handleStartClick}
    >
      診断スタート
    </button>
  );
};

export default StartButton;
