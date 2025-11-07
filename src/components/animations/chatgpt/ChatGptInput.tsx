'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

const ChatGptInput = () => {
  const [text, setText] = useState('');
  const [inputWidth, setInputWidth] = useState<number>(0);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const mirrorRef = useRef<HTMLSpanElement | null>(null);

  // Measure input width once it renders
  useLayoutEffect(() => {
    if (inputRef.current) {
      setInputWidth(inputRef.current.offsetWidth);
    }
  }, []);

  // Compare text width vs input width dynamically
  useEffect(() => {
    if (!mirrorRef.current || !inputRef.current || inputWidth === 0) return;
    mirrorRef.current.textContent = text || '';
    const textWidth = mirrorRef.current.offsetWidth;
    const buffer = 10; // add small padding buffer
    setIsOverflowing(textWidth + buffer > inputWidth);
  }, [text, inputWidth]);

  return (
    <div className="h-screen flex flex-col justify-end items-center bg-[#0f0f0f] text-white p-4">
      {/* --- When text overflows, show above container --- */}
      {isOverflowing && (
        <div className="w-full max-w-[800px] bg-[#181818] rounded-2xl px-4 py-3 mb-3 transition-all duration-300">
          <div className="whitespace-pre-wrap text-lg leading-relaxed break-words">
            {text}
          </div>
        </div>
      )}

      {/* --- Input section --- */}
      <div className="relative flex items-center w-full max-w-[800px] bg-[#181818] rounded-full px-4 py-2 gap-3">
        <PlusIcon />

        {/* Keep input visible even after overflow, but clear its content visually */}
        <input
          ref={inputRef}
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-lg placeholder-gray-400"
          placeholder="Ask anything..."
          value={isOverflowing ? '' : text}
          onChange={(e) => setText(e.target.value)}
        />

        <ArrowDownIcon />

        {/* Hidden span for text measurement */}
        <span
          ref={mirrorRef}
          className="absolute top-0 left-0 invisible whitespace-pre text-lg font-normal px-[52px]"
        />
      </div>
    </div>
  );
};

export default ChatGptInput;

// ICONS
const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="size-[24px] shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="size-[36px] shrink-0"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M17 3.34a10 10 0 1 1 -14.995 8.984v-.648a10 10 0 0 1 14.995 -8.336zm-4.98 3.66a1 1 0 0 0 -1.01.08l-.083.073-4 4a1 1 0 0 0 1.32 1.497l2.293-2.293v5.586a1 1 0 1 0 2 0v-5.585l2.293 2.292a1 1 0 1 0 1.414-1.414l-4-4a1 1 0 0 0 -.227-.166z" />
  </svg>
);
