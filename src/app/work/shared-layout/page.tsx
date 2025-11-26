"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

const page = () => {
  const tabs = ["Design", "Engineer", "Product", "Marketing", "Sales"];
  const [currenttab, setCurrentTab] = useState(tabs[0].toLowerCase());

  return (
    <section className="max-w-[1000px] mx-auto h-screen">
      <div className="flex gap-4 mt-8 overflow-scroll mx-4">
        {tabs.map((item: string) => (
          <Button
            onClick={() => setCurrentTab(item.toLowerCase())}
            className={cn(
              "h-[42px] text-base px-8 py-4 rounded-full flex justify-center items-center",
              item.toLowerCase() === currenttab.toLowerCase()
                ? "bg-white text-black"
                : "bg-[#242424] text-white border border-[#363636]"
            )}
          >
            {item}
          </Button>
        ))}
      </div>
      <AnimatePresence mode="sync">
        <motion.div
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            translateY: 0,
          }}
          exit={{
            opacity: 0,
            filter: "blur(4px)",
            scale: 0.95,
            translateY: 12,
          }}
          initial={{
            opacity: 0,
            filter: "blur(4px)",
            scale: 0.95,
            translateY: 800,
          }}
          key={currenttab}
          transition={{
            type: "spring",
            duration: 0.55,
            bounce: 0,
          }}
          className="mt-8"
        >
          <TabContent key={currenttab} tabkey={currenttab} />
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default page;

const TabContent = ({ tabkey }: { tabkey: string }) => {
  switch (tabkey) {
    case "design":
      return (
        <div className="relative flex h-full w-full items-center justify-center gap-8">
          <motion.div
            className="size-16 rounded-full bg-orange-500"
            layoutId="circle-1"
          />
          <motion.div
            className="size-16 rounded-full bg-blue-500"
            layoutId="circle-2"
          />
          <motion.div
            className="size-16 rounded-full bg-green-500"
            layoutId="circle-3"
          />
        </div>
      );

    case "engineer":
      return (
        <div className="relative flex h-full w-full items-center justify-center gap-8">
          <motion.div
            className="size-24 rounded-full bg-orange-500"
            layoutId="circle-1"
          />
          <motion.div
            className="size-16 rounded-full bg-blue-500"
            layoutId="circle-2"
          />
          <motion.div
            className="size-24 rounded-full bg-green-500"
            layoutId="circle-3"
          />
        </div>
      );

    case "product":
      return (
        <div className="relative flex h-full w-full items-center justify-center gap-8">
          <motion.div
            className="size-32 rounded-full bg-orange-500"
            layoutId="circle-1"
          />
          <motion.div
            className="size-32 rounded-full bg-blue-500"
            layoutId="circle-2"
          />
          <motion.div
            className="size-16 rounded-full bg-green-500"
            layoutId="circle-3"
          />
        </div>
      );
    case "marketing":
      return (
        <div className="relative flex h-full w-full items-center justify-center gap-8">
          <motion.div
            className="size-0 rounded-full bg-orange-500"
            layoutId="circle-1"
          />
          <motion.div
            className="size-16 rounded-full bg-blue-500"
            layoutId="circle-2"
          />
          <motion.div
            className="size-0 rounded-full bg-green-500"
            layoutId="circle-3"
          />
        </div>
      );
    case "sales":
      return (
        <div className="relative flex h-full w-full items-center justify-center gap-8">
          <motion.div
            className="size-16 rounded-full bg-orange-500"
            layoutId="circle-1"
          />
          <motion.div
            className="size-16 rounded-full bg-blue-500"
            layoutId="circle-2"
          />
          <motion.div
            className="size-20 rounded-full bg-green-500"
            layoutId="circle-3"
          />
        </div>
      );
    default:
      return null;
  }
};
