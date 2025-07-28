'use client';
import { Star } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";

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
    <div className="flex flex-col absolute bottom-[32px] left-0 right-0 w-full z-50">
      <div className="flex items-center justify-center gap-4 max-w-[300px] mx-auto px-6 pointer-events-auto">
        {socials.map((social, index) => (
          <motion.a
            key={index}
            href={social.href}
            target={social.external ? "_blank" : "_self"}
            rel={social.external ? "noopener noreferrer" : ""}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-10 h-10 flex items-center justify-center"
          >
            <Image
              src={social.icon}
              alt={social.alt}
              width={42}
              height={42}
              className="object-contain w-full h-full"
            />
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default SocialSection;

const socials = [
  {
    href: "mailto:kumarazad2917@gmail.com",
    icon: "/gmail.svg",
    alt: "Gmail",
    external: false,
  },
  {
    href: "https://www.linkedin.com/in/azadkumar93108/",
    icon: "/linkedin.svg",
    alt: "LinkedIn",
    external: true,
  },
  {
    href: "https://github.com/AzadTom?tab=repositories",
    icon: "/github_white.svg",
    alt: "GitHub",
    external: true,
  },
  {
    href: "https://x.com/Azadtom2917",
    icon: "/x_white.svg",
    alt: "Twitter/X",
    external: true,
  },
];

export const InfiniteScrollTags = () => {
  return (
    <motion.div className="overflow-hidden w-full py-8 my-8">
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

const TagItem = ({ item }: { item: string }) => (
  <div className="text-xl px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-2 text-white uppercase outfit-300">
    <Star fill="#ffffff" className="text-white rounded-none" />
    {item}
  </div>
);
