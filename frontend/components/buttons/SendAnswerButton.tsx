import React from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const SendAnswerButton = () => {
  return (
    <button
      className="w-24 text-center bg-green-500 text-white font-bold py-2 rounded hover:bg-green-600 transition-transform transform hover:scale-105"
      type="submit"
    >
      send <SendRoundedIcon fontSize="inherit" />
    </button>
  );
};

export default SendAnswerButton;
