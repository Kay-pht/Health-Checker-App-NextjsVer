import React from "react";
import KeyboardDoubleArrowRightRoundedIcon from "@mui/icons-material/KeyboardDoubleArrowRightRounded";
import usePageHandler from "@/hooks/usePageHandler";

const NextPageButton = () => {
  // ページ切り替え操作のロジック
  const { pageUpHandler } = usePageHandler();
  return (
    <button
      className="w-24 text-center bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition-transform transform hover:scale-105 ml-auto"
      onClick={pageUpHandler}
      aria-label="Next page"
    >
      <KeyboardDoubleArrowRightRoundedIcon />
    </button>
  );
};

export default NextPageButton;
