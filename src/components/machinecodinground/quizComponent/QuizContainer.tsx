"use client";

import React, { useState } from "react";
import { quizData } from "../utils/utils";
import { cn } from "@/lib/utils";

const QuizContainer = () => {
  return (
    <div>
      <Quiz list={quizData} />
    </div>
  );
};

export default QuizContainer;

interface QuestionProps {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface AnswerProps extends QuestionProps {
  userSelect: string;
}

const Quiz = ({ list }: { list: QuestionProps[] }) => {
  const [current, setCurrent] = useState(0);

  const [trackAnswerResponse, setTrackAnswerResponse] = useState<AnswerProps[]>(
    []
  );

  const handleNext = () => {
    setCurrent((prev) => {
      if (prev < list.length) {
        return prev + 1;
      } else {
        return prev;
      }
    });
  };

  const handlePrev = () => {
    setCurrent((prev) => {
      if (prev !== 0) {
        return prev - 1;
      } else {
        return prev;
      }
    });
  };

  const handleSelectOption = (item: AnswerProps) => {
    setTrackAnswerResponse((prev) => [...prev, item]);
  };

  const getNumberQuestion = (answerResposne:AnswerProps[])=>{
    const list = answerResposne.filter((item)=> item.userSelect ? true:false);
    return list.length;
  }

  const getWrongRightAnswerResponse = (answerResponse:AnswerProps[],type:number)=>{
    const rightlist = answerResponse.filter((item)=> item.answer.toLowerCase().includes(item.userSelect.toLowerCase()));
    const wronglist = answerResponse.filter((item)=> !item.answer.toLowerCase().includes(item.userSelect.toLowerCase()));
    return type === 0 ? wronglist.length :rightlist.length;
  }

  return (
    <div className="bg-[#242424] border border-[#323232] rounded-xl text-white p-4">
      {current === list.length ? (
        <div>
          <h2>You have answer {getNumberQuestion(trackAnswerResponse)} question out of {list.length}</h2>
          <p>You have given {getWrongRightAnswerResponse(trackAnswerResponse,0)} wrong answer out of {list.length}</p>
          <p>You have given {getWrongRightAnswerResponse(trackAnswerResponse,1)} right answer out of {list.length}</p>
          <div className="flex flex-col gap-2 ">
            {trackAnswerResponse.map((item)=>(
              <div className="text-sm">
                <p>{item.id}. {item.question}</p>
                 <p className={cn(item.answer.toLowerCase().includes(item.userSelect.toLowerCase()) ? "text-green-600":"text-red-600")}>Your Answer: ${item.userSelect}</p>
                 <p>Actual answer: {item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <QuizItem
          {...list[current]}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleSelectOption={handleSelectOption}
          isLast={current === list.length - 1 ? true : false}
        />
      )}
    </div>
  );
};

const QuizItem = ({
  id,
  answer,
  options,
  question,
  handleNext,
  handlePrev,
  isLast,
  handleSelectOption,
}: {
  id: number;
  question: string;
  options: string[];
  answer: string;
  handleNext: () => void;
  handlePrev: () => void;
  isLast: boolean;
  handleSelectOption: (item: AnswerProps) => void;
}) => {
  const [value, setValue] = useState<string>("");

  const handleOption = (checked: string) => {
    if (checked === value) {
      handleSelectOption({ id, question, options, answer, userSelect: "" });
      setValue("");
    } else {
      handleSelectOption({
        id,
        question,
        options,
        answer,
        userSelect: checked,
      });
      setValue(checked);
    }
  };

  return (
    <div>
      <p className="text-base font-medium">
        {id}. {question}
      </p>
      <ul className="grid gap-2  grid-cols-2 place-items-baseline my-4">
        {options.map((item) => (
          <li className="text-sm flex items-center gap-1 w-full">
            <CheckBox
              id={item}
              value={value}
              onChange={(checked: string) => handleOption(checked)}
            />
            {item}
          </li>
        ))}
      </ul>
      <div className="flex gap-4 justify-between items-center">
        <button
          onClick={handlePrev}
          className="bg-black px-4 py-2 rounded-full flex-1 text-sm"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-black px-4 py-2 rounded-full flex-1 text-sm"
        >
          {isLast ? "Complete" : "Next"}
        </button>
      </div>
    </div>
  );
};

const CheckBox = ({ value, onChange, id }: any) => {
  return (
    <label
      className="relative flex items-center p-3 rounded-full cursor-pointer"
      htmlFor={id}
    >
      <input
        type="checkbox"
        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:bg-[#367E8A] checked:before:bg-[#367E8A] hover:before:opacity-10 checked:after:content['✔'] checked:after:absolute checked:after:top-2/4 checked:after:left-2/4 checked:after:-translate-y-2/4 checked:after:-translate-x-2/4 checked:after:text-white checked:after:text-sm"
        checked={value === id}
        onChange={(e) => onChange(id)}
        id={id}
      />

      <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth={1}
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </label>
  );
};
