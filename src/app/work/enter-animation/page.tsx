"use client";

import React from "react";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const page = () => {
  return (
    <div className="w-full flex justify-center items-start">
      <HeroSection />
    </div>
  );
};

export default page;

const HeroSection = () => {
  const content = {
    title: "Less helps understand expenses and build habits that last",
    description: `Budgeting turned upside down. Focus on what matters and keep your spending intentional.`,
  };

  const letters = content.title.split("");

  // Each letter staggers 0.015
  const stagger = 0.015;
  const letterDuration = 0.55;

  // Full animation timeline for the title
  const titleTotalDelay = letters.length * stagger + letterDuration;

  const clipVariants: Variants = {
    hidden: {
      clipPath: "inset(0 0 100% 0)",
    },
    visible: {
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Parent handles the stagger
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  // Children DO NOT manually delay — parent controls everything
  const letterVariant: Variants = {
    hidden: {
      opacity: 0,
      filter: "blur(6px)",
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        duration: letterDuration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8, filter: "blur(6px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const videoVarients: Variants = {
    initial: {
      y: 100,
      opacity: 0,
      scale: 0.8,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.95],
        duration: 1,
      },
    },
  };

  return (
    <section className="w-full flex flex-col">
      <section className="w-full relative">
        {/* BG Image Reveal */}
        <motion.img
          variants={clipVariants}
          initial="hidden"
          animate="visible"
          className="w-full object-cover bg-cover overflow-hidden"
          src="https://images.unsplash.com/photo-1513346940221-6f673d962e97?q=80&w=1470&auto=format&fit=crop"
          alt="img"
        />

        <div className="max-w-[1000px] mx-auto flex flex-col absolute top-1/2 left-0 right-0">
          <div className="flex flex-col gap-4 sm:flex-row mx-4 justify-between items-center">
            {/* Title */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 text-start font-semibold capitalize text-3xl sm:text-4xl tracking-tight text-white"
            >
              {letters.map((char, i) => (
                <motion.span key={i} variants={letterVariant}>
                  {char}
                </motion.span>
              ))}
            </motion.div>

            {/* Description */}
            <motion.div
              className="flex-1 max-w-sm text-start text-white/60 sm:text-white mt-4 sm:mt-0"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: titleTotalDelay + 0.15 }}
            >
              {content.description}
            </motion.div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 mt-6 mx-4">
            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: titleTotalDelay + 0.35 }}
              className="bg-white text-black h-11 rounded-full px-4 font-medium"
            >
              Primary
            </motion.button>

            <motion.button
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: titleTotalDelay + 0.55 }}
              className="border border-[#323232] bg-[#242424] text-white h-11 rounded-full px-4 font-medium"
            >
              Secondary
            </motion.button>
          </div>
        </div>
      </section>
      <div className="relative h-screen flex justify-center items-center">
        <motion.video
          variants={videoVarients}
          initial="initial"
          whileInView="animate"
          className="absolute inset-0 max-w-[1000px] mx-auto rounded-xl mt-12"
          loop
          autoPlay
          muted
          playsInline
        >
          <source src="/bg_video.mp4" type="video/mp4" />
        </motion.video>
      </div>
    </section>
  );
};
