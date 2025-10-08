'use client';
import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { motion, useAnimationFrame, useInView } from 'motion/react';
import CircleRing from "./CircleRing";


const AnimationSection = () => {
  return (
    <section>
      <CircleRing/>
      {/* <CircleAnimation /> */}
      {/* <ImageSlider3D /> */}
    </section>
  )
}

export default AnimationSection


const images = ["https://images.unsplash.com/photo-1649734927679-d795e8c93129?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1652156749420-6d8699e72a01?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1652156748503-68e9160dee88?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1658204238967-3a81a063d162?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1658203897339-0b8c64a42fba?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1649091245826-6f9a6e2b9268?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function ImageSlider3D() {
  return (
    <section className="w-full h-screen overflow-hidden relative bg-black flex items-center justify-center">
      <div
        className="relative w-[200px] h-[250px]"
        style={{ "--quantity": images.length } as CSSProperties}
      >
        <motion.div
          className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[350px] h-[450px]"
          style={{
            transformStyle: "preserve-3d",
            transform: "perspective(1000px)",
          }}
          transition={{ repeat: Infinity, "ease": "linear", duration: 20 }}
          animate={{ rotateY: 360, rotateX: -20 }}
        >
          {images.map((item, index) => (
            <div
              key={item}
              className="absolute inset-0"
              style={
                {
                  "--position": index + 1,
                  transform: `rotateY(calc((var(--position) - 1) * (360 / var(--quantity)) * 1deg)) translateZ(550px)`,
                } as CSSProperties
              }
            >
              <img
                src={item}
                alt={`slide-${index}`}
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}





















