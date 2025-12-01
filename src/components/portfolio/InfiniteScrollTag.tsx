'use client';
import { motion } from 'motion/react';
import { StarIcon } from "lucide-react";
import { tags } from '@/utils/utils';


const InfiniteScrollTags = () => {
    return (
        <motion.div className="overflow-hidden w-full mt-16 mb-24 py-4 bg-gradient-to-r from-[#6A01D3] via-[#8F00FF] to-[#C883FF]">
            <motion.div
                className="flex gap-4 w-max"
                style={{ whiteSpace: "nowrap" }}
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 10,
                }}
            >
                {[...tags, ...tags].map((item, i) => (
                    <TagItem key={i + item} item={item} />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default InfiniteScrollTags;

const TagItem = ({ item }: { item: string }) => (
    <div className="text-xl px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-white uppercase outfit-300 bg-black">
        <StarIcon fill="#ffffff" className="text-white rounded-none" />
        {item}
    </div>
);
