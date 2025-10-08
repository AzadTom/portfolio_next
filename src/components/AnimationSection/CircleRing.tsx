'use client';

import './style.css';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';


const CircleRing = () => {

  const items = [
    "https://images.unsplash.com/photo-1588044841339-460b516d0678?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1758712508625-d8e047c49239?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757672238082-11fbd6fd1acf?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1758645839267-6fa279bde18f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1758566486732-c6bcc1d080e1?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1758751945250-b1bb1d6caeee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1757029459109-e78d8f4fc3d2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1758846182803-6b3f056ec028?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  const radius = 500;
  const anglesteps = 360 / items.length;

  return (
    <motion.div className="w-full h-screen bg-black flex justify-center items-center overflow-hidden">
      <div>
        <h1 className='text-5xl font-bold text-white text-center absolute bottom-4 left-0 right-0 z-50'>Valuable, that is <br />
          our future.portfolio.collaboration.</h1>
      </div>
      <div className="w-[330px] h-[200px] relative transform-3d perspective-[1000px]">
        <motion.div
          animate={{rotateY:360}}
          transition={{repeat:Infinity,ease:"linear",duration:20}}
          style={{transformPerspective:1000}}
          className="w-full h-full relative transform-3d">
          {items.map((item: string, index: number) => {
            const rotateY = index * anglesteps;
            return (
              <div
                key={index}
                style={{
                  transform: `rotateY(${rotateY}deg) translateZ(${radius}px)`,
                }}
                className="absolute inset-0 w-full h-full bg-[#343434] text-white flex justify-center items-center scale-3d"
              >
                <img src={item} alt={item} className='w-full h-full object-cover' />
              </div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CircleRing;


