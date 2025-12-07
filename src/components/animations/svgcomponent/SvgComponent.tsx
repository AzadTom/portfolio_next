'use client';
import React from 'react'
import { motion } from 'motion/react';

const SvgComponent = () => {
    return (
        <>
            <section className='hidden sm:flex flex-col  gap-4 items-center justify-center bg-white h-[50vh] rounded-2xl m-4'>
                <section className='flex flex-col sm:flex-row gap-3 sm:gap-0 items-center'>
                    <motion.div whileHover='animate' className='w-20 h-20 rounded-md shadow-sm bg-white flex justify-center items-center'>
                        <SVG />
                    </motion.div>
                    <div>
                        <Line />
                    </div>
                    <div className="size-[80px] bg-neutral-100 rounded-sm p-px relative overflow-hidden">
                        <div className="absolute w-full h-full  inset-0 [background-image:conic-gradient(at_center,_transparent,_#3b82f6_20%,_transparent_30%)] animate-spin scale-[1.4]"></div>
                        <div className="w-full h-full bg-white rounded-sm relative font-bold text-3xl flex justify-center items-center">N</div>
                    </div>
                </section>
            </section>


        <section className='bg-white mx-4  rounded-2xl p-8 flex justify-center items-center'>
             <div className='bg-neutral-100 size-20 rounded-md p-1 relative overflow-hidden'>
                 <div className='absolute w-full h-full  inset-0 [background-image:conic-gradient(at_center,_transparent,_#3b82f6_20%,_transparent_30%)] animate-spin scale-[1.4]'></div>
                 <div className='absolute w-full h-full  inset-0 [background-image:conic-gradient(at_center,_transparent,_#ff1b6b_20%,_transparent_30%)] animate-spin scale-[1.4]'></div>
                  <div className='absolute w-full h-full  inset-0 [background-image:conic-gradient(at_center,_transparent,_#60efff_20%,_transparent_30%)] animate-spin scale-[1.4]'></div>
                   <div className='relative bg-white w-full h-full rounded-md shadow-md flex justify-center items-center'>
                 </div>
            </div>
        </section>
        </>

    )
}

export default SvgComponent

const SVG = () => {

    return (
        <motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"
            className="">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <motion.path
                variants={{
                    animate: {
                        x: [0, 5, 0, -5, 0, 5, -5]
                    }
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeOut"
                }}
                d="M14.235 19c.865 0 1.322 1.024 .745 1.668a3.992 3.992 0 0 1 -2.98 1.332a3.992 3.992 0 0 1 -2.98 -1.332c-.552 -.616 -.158 -1.579 .634 -1.661l.11 -.006h4.471z" />
            <motion.path
                variants={{
                    animate: {
                        x: [0, 5, 0, -5, 0, 5, -5]
                    }
                }}
                transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeOut"
                }}
                d="M12 2c1.358 0 2.506 .903 2.875 2.141l.046 .171l.008 .043a8.013 8.013 0 0 1 4.024 6.069l.028 .287l.019 .289v2.931l.021 .136a3 3 0 0 0 1.143 1.847l.167 .117l.162 .099c.86 .487 .56 1.766 -.377 1.864l-.116 .006h-16c-1.028 0 -1.387 -1.364 -.493 -1.87a3 3 0 0 0 1.472 -2.063l.021 -.143l.001 -2.97a8 8 0 0 1 3.821 -6.454l.248 -.146l.01 -.043a3.003 3.003 0 0 1 2.562 -2.29l.182 -.017l.176 -.004z" />
        </motion.svg>
    )
}

const Line = () => {


    return (
        <motion.svg width="1000" height="2" viewBox="0 0 1000 2" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line y1="1" x2="1000" y2="1" stroke="#f8fafc" stroke-width="2" />
            <line y1="1" x2="1000" y2="1" stroke="url(#line-one-gradient)" stroke-width="2" />
            <defs>
                <motion.linearGradient
                    gradientUnits="userSpaceOnUse"
                    id="line-one-gradient"
                    initial={{
                        x1: "0%",
                        x2: "10%",
                    }}
                    animate={{
                        x1: "90%",
                        x2: "100%",
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeOut",
                    }}
                >
                    <stop stopColor='transparent' />
                    <stop offset='0.33' stopColor='#000000' />
                    <stop offset='0.66' stopColor='#000000' />
                    <stop offset='1' stopColor='transparent' />
                </motion.linearGradient>
            </defs>
        </motion.svg>
    )
}