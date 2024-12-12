"use client";

import React from "react";

const ResultPageComp = () => {
  return (
    <div className="result">
      <div className="font-semibold">
        <h4 className="text-2xl font-bold  text-gray-900 mb-4 ">診断結果</h4>
        <p className="text-lg mb-2 text-gray-700">
          不足栄養素 :{" "}
          <span className="font-semibold text-red-500">
            {result.missingNutrients.join(", ")}
          </span>
        </p>
        <p className="text-lg mb-2 text-gray-700">
          推奨食材 :{" "}
          <span className="font-semibold text-green-500">
            {result.recommendedFoods.join(", ")}
          </span>
        </p>
        <p className="text-lg text-gray-700">
          スコア :{" "}
          <span className="font-semibold text-blue-500">{result.score}</span>
        </p>
      </div>
    </div>
  );
};

export default ResultPageComp;
