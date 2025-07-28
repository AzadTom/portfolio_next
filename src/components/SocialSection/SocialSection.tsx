'use client';
import { socials } from "@/utils/utils";
import { motion } from "motion/react";
import Image from "next/image";

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



