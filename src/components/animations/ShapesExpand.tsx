'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';

const ShapesExpand = () => {
  const [expand, setExpand] = useState<number | null>(null);

  const handleExpand = (id: number) => {
    setExpand(expand === id ? null : id); // toggle expand
  };

  return (
    <section className="flex flex-col sm:flex-row m-4 justify-around  h-screen gap-4">
      {[1, 2, 3, 4].map((id) => (
        <motion.div
          key={id}
          onClick={() => handleExpand(id)}
          animate={
            expand === id
              ? { width: '100%', height: '100vh', borderRadius: '1rem' }
              : { width: '100%', height: '12rem', borderRadius: '1rem' }
          }
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={`bg-red-600 cursor-pointer  ${
            expand === id ? 'z-10' : 'rounded-2xl'
          }`}
        />
      ))}
    </section>
  );
};

export default ShapesExpand;
