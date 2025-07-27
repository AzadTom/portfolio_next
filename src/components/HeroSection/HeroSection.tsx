import { DownloadIcon } from "@/icon/DownloadIcon";
import { ReactNode } from "react";


const HeroSection = () => {
    return (
        <div
            className="absolute left-[16px] sm:left-[20px] md:left-[70px] right-[16px] sm:right-[20px] md:right-[70px] top-0 h-[650px] md:h-[600px] rounded-b-[50px]"
            style={{
                background:
                    "radial-gradient(98.87% 98.87% at 51.11% 1.13%, rgba(0, 0, 0, 0) 0%, #000000 45.31%, #6A01D3 76.56%, #8F00FF 86.46%, #C883FF 100%)",
            }}
        >
            <div className="text-white flex flex-col items-center justify-center mt-[12rem] sm:mt-20">
                <GradientBorderButton>
                    Get Resume
                </GradientBorderButton>
                <h1 className="mt-[32px] text-4xl outfit-700 font-bold tracking-tight text-[#fafafae6] text-center max-w-[600px] mx-auto">Frontend software engineer from India, focussed on building pixel perfect web apps.</h1>
                <div className="flex gap-4 items-center mt-[32px]">
                <button className="cursor-pointer bg-white  w-full text-black rounded-full h-[45px] px-[24px] py-[12px]  outfit-500 flex justify-center items-center">{"Let's Talk"}</button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection

const GradientBorderButton = ({ children }: { children: ReactNode }) => {
  return (
    <div className="inline-block p-[1px] rounded-full bg-[linear-gradient(90deg,_#FFDEDE_0%,_#F67A7A_36%,_#D4D9FF_69%,_#DC79FF_100%)]">
      <button className="px-[24px] py-[12px] rounded-full bg-black text-white font-medium flex gap-2 items-center">
        <DownloadIcon />{children}
      </button>
    </div>
  );
};