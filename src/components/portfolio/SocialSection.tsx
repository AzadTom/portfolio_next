'use client';
import { ArrowUpRight } from 'lucide-react';
import { socials } from "@/utils/utils";
import { motion } from "motion/react";
import Image from "next/image";

const SocialSection = () => {
  return (
    <>
      <div className='pt-6'>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 px-2 sm:grid-cols-2 pointer-events-auto">
          {socials.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target={social.external ? "_blank" : "_self"}
              rel={social.external ? "noopener noreferrer" : ""}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-full flex items-center p-4 pr-2"
            >
              <div className="flex-1 flex gap-4 items-center w-full">
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={42}
                  height={42}
                  className="object-contain w-[42px] h-[42px]"
                />
                <div className="text-white">
                  <h3 className="flex items-center font-medium underline-offset-4 group-hover/link:underline">{social.alt}</h3>
                  <p className="text-sm text-[#9f9fa9]">{social.username}</p>
                </div>
              </div>
              <span>
                <ArrowUpRight color='#9f9fa9' size={16} />
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </>

  );
};

export default SocialSection;



