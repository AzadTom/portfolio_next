"use client";
import { ReactNode } from "react";
import SplitText from "@/components/splittextanimation/SplitText";
import { DownloadIcon } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { GetRedirectIcon } from "@/icon/GetRedirectionIcon";

const HeroSection = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="absolute left-[16px] sm:left-[20px] md:left-[70px] right-[16px] sm:right-[20px] md:right-[70px] top-0 h-[650px] sm:h-[max-content] pb-24 rounded-b-[50px]"
        style={{
          background:
            "radial-gradient(98.87% 98.87% at 51.11% 1.13%, rgba(0, 0, 0, 0) 0%, #000000 45.31%, #6A01D3 76.56%, #8F00FF 86.46%, #C883FF 100%)",
        }}
      >
        <div className="text-white flex flex-col items-center justify-center mt-[12rem] sm:mt-20">
          <h1 className="mt-[32px] text-4xl outfit-700 font-bold tracking-tight text-[#fafafae6] text-center max-w-[600px] mx-auto">
            <SplitText text="Frontend software engineer from India, focussed on building pixel perfect web apps." />
          </h1>
          <div className="flex gap-4 items-end justify-end  mt-[32px]">
            {/* <GradientBorderButton>Get Resume</GradientBorderButton> */}
            <AnimateButton>Get Resume</AnimateButton>
            {/* <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="cursor-pointer bg-white  w-full text-black rounded-full h-[45px] px-[24px] py-[12px]  outfit-500 flex justify-center items-center self-end">
              <Link href="#contact-me">
                Lets Talk
              </Link>
            </motion.button> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HeroSection;


const AnimateButton = ({ children }: { children: ReactNode }) => {
  return (
    <Link href="https://drive.google.com/file/d/1a_wLmZIqFaq_B3inTpn26w6x8I9dMVT2/view?usp=sharing">
      {/* From Uiverse.io by Rauliqbal */}
    <button
      style={{
        background:
          "radial-gradient(rgba(0, 0, 0, 0) 0%, #6A01D3 76.56%, #8F00FF 86.46%)",
      }}
     className="cursor-pointer px-6 py-3 rounded-full border-[1px] border-white text-white font-medium group">
        <div className="relative overflow-hidden font-medium">
          <p className="group-hover:-translate-y-7 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] flex gap-1 items-center">
          <DownloadIcon />{children}
          </p>
          <p className="absolute top-7 left-0 group-hover:top-0 duration-[1.125s] ease-[cubic-bezier(0.19,1,0.22,1)] flex gap-1 items-center ">
          <DownloadIcon /> {children}
          </p>
        </div>
      </button>
    </Link>
  );
};
