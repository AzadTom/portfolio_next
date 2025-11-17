'use client';
import { motion } from 'motion/react';
import React from "react";

const AboutMe = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once:false}}
      id="about-me" className="pt-16 px-4 max-w-[1000px] mx-auto text-white">
      <h2 className="mb-6 text-3xl font-semibold outfit-600">
        About me.
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4 flex flex-col gap-4 outfit-400 text-[#f5f5f5]">
        <span>
          Hey! I&#39;m a frontend developer passionate about building scalable
          websites and applications. I focus on delivering exceptional user
          experiences, beautiful interfaces, and seamless developer workflows.
          <span className="hidden sm:inline">
            {" "}
            I thrive at the intersection of design and engineering—creating
            products that are both visually appealing and technically sound.
          </span>
        </span>
        <span>
          Outside of coding, you&#39;ll often find me diving into books. I’m always curious and love learning through
          creativity and collaboration.
        </span>
      </p>
    </motion.section>
  );
};

export default AboutMe;
