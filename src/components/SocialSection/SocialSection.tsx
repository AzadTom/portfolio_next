'use client';
import { Star } from "lucide-react";
import { motion } from "motion/react"
import Image from "next/image"


const tags = [
    "Frontend",
    "Accessibility",
    "User-Friendly",
    "Responsive Design",
    "Mobile-First",
    "Performance",
    "UI/UX",
    "SEO Optimized",
    "Dark Mode",
];


const SocialSection = () => {
    return (
        <div className=" flex flex-col absolute bottom-[32px] left-0 right-0 w-full">
            <InfiniteScrollTags />
            <div className="flex items-center gap-4 max-w-[300px] mx-auto px-6">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1" >
                    <a href="mailto:kumarazad2917@gmail.com">
                        <Image src="/gmail.svg" width={24} height={24} alt="gmail" className="w-full h-full" />
                    </a>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1" >
                    <a href="https://www.linkedin.com/in/azadkumar93108/">
                        <Image src="/linkedin.svg" width={42} height={42} alt="linkedin" className="w-full h-full" />
                    </a>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1" >
                    <a href="https://github.com/AzadTom?tab=repositories">
                        <Image src="/github_white.svg" width={42} height={42} alt="github" className="w-full h-full" />
                    </a>
                </motion.div>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1" >
                   <a href="https://x.com/Azadtom2917">
                     <Image src="/x_white.svg" width={42} height={42} alt="twitter" className="w-full h-full" />
                   </a>
                </motion.div>
            </div>
        </div>
    )
}

export default SocialSection

const InfiniteScrollTags = () => {
    return (
        <motion.div className="overflow-hidden w-full  py-8 my-8">
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
                {/* Duplicate content for seamless scroll */}
                {[...tags, ...tags].map((item, i) => (
                    <TagItem key={i + item} item={item} />
                ))}
            </motion.div>
        </motion.div>
    );
};


const TagItem = ({ item }: { item: string }) => (
    <div className="text-xl px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-white uppercase outfit-300">
        <Star fill="#ffffff" className="text-white rounded-none" />{item}
    </div>
);






