"use client";

import KeyboardDoubleArrowLeftRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftRounded";
import usePageHandler from "@/hooks/usePageHandler";

const PreviousPageButton = () => {
  // ページ切り替え操作のロジック
  const { pageDownHandler } = usePageHandler();
  return (
    <button
      className="w-24 text-center bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-105"
      onClick={pageDownHandler}
      aria-label="Previous page"
    >
      {/* previous */}
      <KeyboardDoubleArrowLeftRoundedIcon />
    </button>
  );
};

export default PreviousPageButton;
