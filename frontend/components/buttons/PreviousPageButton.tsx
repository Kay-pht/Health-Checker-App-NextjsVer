"use client";

import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import usePageHandler from "@/hooks/usePageHandler";

const PreviousPageButton = () => {
  // ページ切り替え操作のロジック
  const { pageDownHandler } = usePageHandler();
  return (
    <button
      className="w-24 text-center bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition-transform transform hover:scale-105"
      onClick={pageDownHandler}
    >
      {/* previous */}
      <KeyboardDoubleArrowLeftRoundedIcon />
    </button>
  );
};

export default PreviousPageButton;
