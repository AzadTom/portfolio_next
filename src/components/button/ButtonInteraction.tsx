import { cn } from "@/lib/utils";
import React from "react";

export const ButtonInteractionContainer = () => {
  return <div className="flex justify-center items-center h-screen">
    <ButtonInteraction name="Manu"/>
  </div>;
};


const ButtonInteraction = ({name}:{name:string}) => {
  return (
    <button className="relative cursor-pointer group text-white rounded-lg pl-12  py-0.5 pr-2 border-1 border-white/20 flex items-center gap-2 h-[42px]">
      <Box />
      <div className="absolute inset-0 bg-white/20 rounded-lg [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)] transition-[clip-path] duration-400  ease-out"></div>
      <span className="group-hover:-translate-x-10 transition-transform duration-400">
        Chat with {name}
      </span>
    </button>
  );
};


export default ButtonInteraction;

const Box = () => {
  return (
    <div className="absolute z-50 left-1 inset-y-0 my-auto size-8 group-hover:left-[calc(100%-36px)] group-hover:transform ease-out group-hover:rotate-180 duration-400 rounded-md bg-yellow-500 flex flex-col justify-center items-center gap-px ">
      <div className="flex gap-px">
        <Bubble />
        <Bubble />
        <Bubble highLight />
        <Bubble />
        <Bubble />
      </div>
      <div className="flex gap-px">
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble highLight />
        <Bubble />
      </div>
      <div className="flex gap-px animate-pulse ease-linear duration-200">
        <Bubble highLight />
        <Bubble highLight />
        <Bubble highLight />
        <Bubble highLight />
        <Bubble highLight />
      </div>
      <div className="flex gap-px">
        <Bubble />
        <Bubble />
        <Bubble />
        <Bubble highLight />
        <Bubble />
      </div>
      <div className="flex gap-px">
        <Bubble />
        <Bubble />
        <Bubble highLight />
        <Bubble />
        <Bubble />
      </div>
    </div>
  );
};

const Bubble = ({ highLight }: { highLight?: boolean }) => {
  return (
    <span
      className={cn(
        "flex size-[3px] rounded-full bg-white/25 aspect-square max-w-[90%]",
        highLight && "bg-white"
      )}
    ></span>
  );
};
