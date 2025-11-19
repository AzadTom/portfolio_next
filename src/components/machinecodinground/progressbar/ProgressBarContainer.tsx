"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const ProgressBarContainer = () => {
  const [value, setValue] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setValue((prev) => prev + 0.1);
    }, 20);
  }, []);

  return (
    <div className=" p-4 rounded-xl bg-[#242424] border border-[#343434]">
      <ProgressBar onComplete={() => setIsComplete(true)} value={value} />
      <p className="my-4 text-center text-white">
        {isComplete ? "Success" : "loading..."}
      </p>
    </div>
  );
};

export default ProgressBarContainer;

const MIN = 0;
const MAX = 100;
const ProgressBar = ({
  onComplete,
  value,
}: {
  value: number;
  onComplete: () => void;
}) => {
  const [percent, setPercent] = useState(value);

  useEffect(() => {
    setPercent(Math.min(Math.max(value, MIN), MAX));
    if (value >= MAX) {
      onComplete();
    }
  }, [value]);

  return (
    <div className="relative rounded-full h-[42px] bg-gray-200 border border-gray-400 overflow-hidden">
      <span
        className={cn(
          "absolute text-center left-0 top-0 w-full h-full flex justify-center items-center z-20",
          percent > 49 ? "text-white" : "text-black"
        )}
      >
        {percent.toFixed()}%
      </span>
      <div
        aria-valuemin={MIN}
        aria-valuemax={MAX}
        aria-valuenow={Number(percent.toFixed())}
        role="progressbar"
        className="bg-green-600 w-full h-full"
        style={{
          transformOrigin: "left",
          transform: `scaleX(${percent / MAX})`,
        }}
      ></div>
    </div>
  );
};
