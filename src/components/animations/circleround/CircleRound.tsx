"use client";

import { animate, useMotionValue, useTransform, motion } from "motion/react";
import { useEffect, useState } from "react";

const CircleRound = ({
  date = "15 Oct,2025",
  day = "Monday",
  week = 4,
}: {
  date?: string;
  day?: string;
  week?: number;
}) => {
  const [weekl, setWeek] = useState(0);
  const percentageNumber = (weekl / 40) * 100;
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, percentageNumber, {
      duration: 1,
      ease: "easeOut",
    });
    return controls.stop;
  }, [weekl]);

  const backgroundImage = useTransform(
    progress,
    (value) =>
      `conic-gradient(from 0deg, #f87171 ${value}%, transparent ${value}%)`
  );

  return (
    <>
      <section className="flex justify-between items-center relative my-12">
        <div className="w-[300px] h-[300px] mx-auto rounded-full bg-[#EDEDED] p-2 relative overflow-hidden">
          <motion.div
            style={{ backgroundImage }}
            className="absolute w-full h-full inset-0 rounded-full"
          />
          <div
            className="absolute inset-0 w-full h-full rounded-full"
            style={{
              background: `radial-gradient(circle, transparent 85%, #EDEDED 85%)`,
            }}
          />
          <div className="relative w-full h-full rounded-full mx-auto bg-white p-2">
            <div className="w-full h-full rounded-full mx-auto bg-gradient-to-b from-stone-50 to-orange-100 flex flex-col justify-center items-center">
              <p className="text-[#242F35] text-base">
                Your little one is <br /> likely to arrive on
              </p>
              <p className="text-black text-2xl font-bold mt-4">{date}</p>
              <p className="text-[#242F35] text-lg m-1">{day}</p>
            </div>
          </div>
        </div>
      </section>
      <div
        className="max-w-[max-content] mx-auto flex justify-center gap-4  cursor-pointer items-center bg-white text-base font-medium px-6 py-2 rounded-md"
      >
        <span
          className="text-2xl"
          onClick={() => setWeek((prev) => (prev > 0 ? prev - 10 : prev))}
        >
          -
        </span>
        <span>{weekl}</span>
        <span
          className="text-2xl"
          onClick={() => setWeek((prev) => (prev >= 40 ? prev : prev + 10))}
        >
          +
        </span>
      </div>
    </>
  );
};

export default CircleRound;
