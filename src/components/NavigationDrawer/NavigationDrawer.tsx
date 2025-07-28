'use client';
import { motion, useCycle } from 'motion/react';
import React, { useRef } from 'react'
import { MenuToggle } from './MenuToggle';
import { Navigation } from './Navigation';
import { useDimensions } from '@/hooks/useDimension';
import { cn } from '@/lib/utils';

const variantsSidebar = {
  open: (height = 1000) => {
    const x = window.innerWidth - 50;
    return {
      clipPath: `circle(${height * 2 + 200}px at ${x}px 50px)`,
      transition: {
        type: "spring" as const,
        stiffness: 20,
        restDelta: 2
      }
    };
  },
  closed: () => {
    const x = window.innerWidth - 50;
    return {
      clipPath: `circle(30px at ${x}px 50px)`,
      transition: {
        delay: 0.5,
        type: "spring" as const,
        stiffness: 400,
        damping: 40
      }
    };
  }
};



const NavigationDrawer = () => {

  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef<HTMLElement | null>(null);
  const { height } = useDimensions(containerRef);


  return (
    <div className='fixed inset-0 z-[999] w-[100vw] h-[100vh] overflow-hidden'>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        ref={containerRef}
        custom={height}
        className='absolute top-0 right-0 bottom-0 w-full'
      >
        <motion.div
          className={cn("absolute top-0 right-0 bottom-0 w-full ", isOpen ? "bg-white" : "bg-white")}
          variants={variantsSidebar}
        />
        <Navigation />
        <MenuToggle toggle={() => toggleOpen()} />
      </motion.nav>
    </div>
  )
}

export default NavigationDrawer