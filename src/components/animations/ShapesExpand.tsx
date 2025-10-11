'use client';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ShapesExpand = () => {
  const [active, setActive] = useState<null | 'left' | 'right'>(null);

  return (
    <section className="w-full h-screen flex justify-between gap-4 px-4 overflow-hidden">
      {/* Left Panel */}
      <motion.div
        onMouseEnter={() => setActive('left')}
        onMouseLeave={() => setActive(null)}
        onClick={() => setActive('left')}
        animate={{
          flex: active === 'left' ? 1 : active === 'right' ? 0 : 0.5,
          height: active === 'left' ? '100%' : '16rem',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl cursor-pointer"
      />

      {/* Right Panel */}
      <motion.div
        onMouseEnter={() => setActive('right')}
        onMouseLeave={() => setActive(null)}
        onClick={() => setActive('right')}
        animate={{
          flex: active === 'right' ? 1 : active === 'left' ? 0 : 0.5,
          height: active === 'right' ? '100%' : '16rem',
        }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
        className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl cursor-pointer"
      />
    </section>
  );
};

export default ShapesExpand;
