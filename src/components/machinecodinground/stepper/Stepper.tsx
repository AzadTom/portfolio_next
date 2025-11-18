"use client";

import { cn } from "@/lib/utils";
import React, { JSX, useEffect, useRef, useState } from "react";

interface StepperProps {
  steps: {
    name: string;
    Component: () => JSX.Element;
  }[];
}

const Stepper = ({ steps }: StepperProps) => {
  const [margin, setMargin] = useState({
    marginLeft: 0,
    marginRight: 0,
  });
  const stepRef = useRef<Array<HTMLDivElement>>([]);
  const [count, setCount] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  const handleNext = () => {
    setCount((prev) => {
      if (prev === steps.length) {
        setIsComplete(true);
        return prev;
      } else {
        return prev + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    const totalLength = steps.length;
    const value = ((count-1) / (totalLength-1)) * 100;
    return value;
  };

  useEffect(() => {
    setMargin({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[steps.length - 1].offsetWidth / 2,
    });

    console.log("current:", stepRef.current[0].offsetWidth / 2);
    console.log("current:", stepRef.current[steps.length - 1].offsetWidth / 2);
  }, [stepRef.current, steps.length]);

  return (
    <>
      <div className="bg-[#242424] border border-[#363636] text-white flex justify-between items-center relative rounded-t-xl">
        {steps.map((item, index) => (
          <div
            ref={(el) => {
              if (el) {
                stepRef.current[index] = el;
              }
            }}
            key={item.name}
            className={cn("text-center z-10 p-4 flex flex-col items-center")}
          >
            <div
              className={cn(
                "bg-gray-300 rounded-full h-[42px] aspect-square flex justify-center items-center",
                count === index + 1 ? "bg-blue-600" : "",
                count > index + 1 || isComplete ? "bg-green-600" : ""
              )}
            >
              {count > index + 1 || isComplete ? (
                <span className="text-white">&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <div>{item.name}</div>
          </div>
        ))}

        <div
          className="absolute bg-gray-200 top-1/3 left-0 h-1"
          style={{ width: `calc(100% - ${margin.marginLeft+margin.marginRight}px)`,marginLeft:margin.marginLeft,marginRight:margin.marginRight}}
        >
          <div
            className="bg-green-600 w-full h-full"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-[#242424] border border-[#363636] text-white py-4 flex flex-col gap-4 justify-center items-center rounded-b-xl">
        {steps[count - 1].Component()}
       {!isComplete &&(
         <button
         className="h-[42px] w-[200px] bg-black text-white m-4 rounded-full px-8 py-4 flex justify-center items-center"
         onClick={handleNext}
       >
         Next
       </button>
       )}
      </div>
    </>
  );
};

export default Stepper;
