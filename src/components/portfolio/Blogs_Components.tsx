"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getOnlyBlogs, getOnlyComponents, TListItemType } from "@/utils/utils";
import { Aperture, Atom, BookMarked, ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

type TTabs = "blogs" | "components" | "all";

const getInitialData = (currentTab: TTabs) => {
  if (currentTab === "blogs") {
    return getOnlyBlogs();
  }
  if (currentTab === "components") {
    return getOnlyComponents();
  }
  return [...getOnlyBlogs(), ...getOnlyComponents()];
};

const getIcon = (item: TTabs) => {
  if (item === "blogs") {
    return <BookMarked width={20} height={20} />;
  }

  if (item === "components") {
    return <Atom width={20} height={20} />;
  }
  return <Aperture width={20} height={20} />;
};

const Blogs_Components = () => {
  const tabs: TTabs[] = ["all", "blogs", "components"];
  const [currentTab, setCurrentTab] = useState<TTabs>("all");
  const [list, setList] = useState(getInitialData(currentTab));

  const [activeview, setActiview] = useState<TListItemType | null>(null);

  const handleTabs = (item: TTabs) => {
    setCurrentTab(item);
    const data = getInitialData(item);
    setList(data);
  };
  const handleOnCLick = (item: TListItemType) => {
    setActiview(item);
  };

  return (
    <div className="max-w-[1000px] mx-auto px-4 my-12">
      <h2 className="text-3xl font-semibold text-white outfit-600">
        Blog & Components
      </h2>
      <motion.div layout className="my-5 flex items-center gap-4">
        {tabs.map((item: TTabs) => (
          <button
            onClick={() => handleTabs(item)}
            className={cn(
              "relative capitalize text-base rounded-full py-2 px-4  flex gap-1 justify-center items-center cursor-pointer",
              currentTab.toString().includes(item)
                ? "text-white"
                : "border border-white text-white"
            )}
          >
            {currentTab === item && (
              <motion.span
                layoutId="bubble"
                className="absolute inset-0 z-50 bg-white mix-blend-difference"
                style={{ borderRadius: 9999 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            {item}
            {getIcon(item)}
          </button>
        ))}
      </motion.div>
      {activeview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          onClick={() => setActiview(null)}
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-lg w-full h-full flex flex-col justify-center items-center"
        >
          <motion.div
            onClick={(e)=>e.stopPropagation()}
            layoutId={`component-${activeview.name}`}
            className="text-white flex items-center  min-w-sm sm:min-w-md gap-4 bg-[#242424] border border-[#343434] group cursor-pointer"
          >
            <div className="size-20 sm:size-40">
              <img
                src={activeview.img}
                alt="img"
                className="w-full h-full object-cover bg-cover group-hover:scale-110 transition-all duration-200"
              />
            </div>
            <div>
              <motion.h2
                layoutId={`title-${activeview.name}`}
                transition={{ delay: 0.2 }}
                className="text-lg sm:text-2xl font-medium"
              >
                {activeview.name}
              </motion.h2>
              <motion.p
                layoutId={`date-${activeview.name}`}
                transition={{ delay: 0.2 }}
                className="text-white/50"
              >
                {activeview.date.toDateString()}
              </motion.p>
            </div>
          </motion.div>
          <motion.div
            onClick={(e)=>e.stopPropagation()}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, type: "spring", delay: 0.2 }}
            className="mt-5"
          >
            <Link href={activeview.link}>
              <button
                type="button"
                className="cursor-pointer text-white flex items-center gap-2 bg-[#242424] border border-[#343434] rounded-full px-5 py-2"
              >
                Open For Preview <ExternalLink />
              </button>
            </Link>
          </motion.div>
        </motion.div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {list.map((item) => (
          <CardItem
            key={item.id}
            {...item}
            handleOnCLick={() => handleOnCLick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs_Components;

const CardItem = ({
  date,
  img,
  link,
  name,
  type,
  handleOnCLick,
}: TListItemType & { handleOnCLick: () => void }) => {
  return (
    <motion.div
      onClick={handleOnCLick}
      layoutId={`component-${name}`}
      className="text-white flex items-center gap-4 bg-[#242424] border border-[#343434] group cursor-pointer relative"
    >
      <div className="size-20 sm:size-40">
        <img
          src={img}
          alt="img"
          className="w-full h-full object-cover bg-cover group-hover:scale-110 transition-all duration-200"
        />
      </div>
      <div>
        <motion.h2
          layoutId={`title-${name}`}
          className="text-lg sm:text-2xl font-medium"
        >
          {name}
        </motion.h2>
        <motion.p layoutId={`date-${name}`} className="text-white/50">
          {date.toDateString()}
        </motion.p>
      </div>
      <div className="absolute bottom-4 right-4">
        <ExternalLink />
      </div>
    </motion.div>
  );
};
