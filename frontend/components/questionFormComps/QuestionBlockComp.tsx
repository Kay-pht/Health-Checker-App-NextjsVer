"use client";

import { useRef } from "react";
import { frequencyArray } from "../../utils/queryData";
import type { QuestionCompProps } from "../../interfaces/interfaces";
import { FormControlLabel, Radio } from "@mui/material";
import useFocusNextInput from "../../hooks/useFocusNextInput";

const QuestionBlockComp = ({
  foodQueryPage,
  userAnswer,
  getAnswersInEachPage,
  currentPageNum,
}: QuestionCompProps) => {
  const inputRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // 回答後、未回答の問題にフォーカスするロジック
  useFocusNextInput({ userAnswer, inputRefs, foodQueryPage });

  return (
    <div className="mb-5 ">
      {
        // map関数で質問ごとに表示
        foodQueryPage.map((query, index) => (
          <div
            className={`transition-opacity duration-300 font-semibold bg-white rounded-lg shadow-md p-4 mb-8 ${
              userAnswer[query.key] ? "opacity-50" : "opacity-100"
            }`}
            key={query.key}
          >
            <h3 className="text-xl text-gray-600 mt-3 pb-4 ml-2 text-center">
              {index + currentPageNum * 5 - 4}.{query.value}
            </h3>
            <div className="flex justify-center mt-5 mb-5 min-w-fit md:space-x-10 sm:space-x-0 sm:text-xs">
              {" "}
              {
                // map関数で頻度ごとにラジオボタンを作成
                frequencyArray.map((freq) => (
                  <div
                    className="max-w-lg "
                    key={`${query.key}_option${freq.key}`}
                  >
                    <div className=" flex flex-col items-center text-sm text-center">
                      <FormControlLabel
                        control={
                          <Radio
                            id={`${query.key}_option${freq.key}`}
                            name={query.key}
                            value={freq.key}
                            checked={userAnswer[query.key] === freq.key}
                            onChange={getAnswersInEachPage}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            className="w-10 h-10 items-center "
                            sx={{
                              "& .MuiSvgIcon-root": {
                                fontSize: freq.size,
                                color: freq.color,
                              },
                            }}
                          />
                        }
                        label={freq.value} // spanタグで囲む
                        labelPlacement="bottom"
                        className="block mb-2 text-sm text-gray-600 cursor-pointer font-bold transition-transform transform hover:scale-105"
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "1rem",
                            fontWeight: "bold",

                            "@media (max-width: 640px)": {
                              fontSize: "0.8rem",
                              whiteSpace: "nowrap",
                            },
                            display: "flex",
                            flexDirection: "column",
                          },
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default QuestionBlockComp;
