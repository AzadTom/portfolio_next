'use client';

import './style.css';
import React, { useState } from 'react'
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const ClipPathButton = () => {



    const [isOpen, setIsOpen] = useState(false);


    return (
        <>
            <div className='bg-white h-[50vh] flex justify-center items-center rounded-2xl m-4'>
                <div>
                    <button className="button">
                        <div aria-hidden="true" className="hold-overlay">
                            <TrashIcon />
                            Hold to Delete
                        </div>
                        <TrashIcon />
                        Hold to Delete
                    </button>
                </div>
            </div>

            {/* <ClipPathThemeBox/> */}
        </>
    )
}

export default ClipPathButton


const TrashIcon = () => {

    return (
        <svg height="16" strokeLinejoin="round" viewBox="0 0 16 16" width="16">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.75 2.75C6.75 2.05964 7.30964 1.5 8 1.5C8.69036 1.5 9.25 2.05964 9.25 2.75V3H6.75V2.75ZM5.25 3V2.75C5.25 1.23122 6.48122 0 8 0C9.51878 0 10.75 1.23122 10.75 2.75V3H12.9201H14.25H15V4.5H14.25H13.8846L13.1776 13.6917C13.0774 14.9942 11.9913 16 10.6849 16H5.31508C4.00874 16 2.92263 14.9942 2.82244 13.6917L2.11538 4.5H1.75H1V3H1.75H3.07988H5.25ZM4.31802 13.5767L3.61982 4.5H12.3802L11.682 13.5767C11.6419 14.0977 11.2075 14.5 10.6849 14.5H5.31508C4.79254 14.5 4.3581 14.0977 4.31802 13.5767Z"
                fill="currentColor"
            />
        </svg>
    )
}



function ClipPathThemeBox() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <motion.div
        key={isOpen ? "dark" : "light"} // important for re-triggering animation
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={{ clipPath: "inset(0 0 0 0)" }}
        exit={{ clipPath: "inset(0 0 100% 0)" }}
        transition={{
          duration: 1,
          ease: [0.77, 0, 0.175, 1],
        }}
        className={cn(
          "h-[50vh] mx-4 rounded-2xl overflow-hidden shadow-lg",
          isOpen ? "bg-black text-white" : "bg-white text-black"
        )}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="cursor-pointer px-6 py-2 rounded-full bg-black text-white font-medium text-sm"
          >
            Theme
          </button>
        </div>

        <div className="flex items-center justify-center h-full text-3xl font-semibold">
          {isOpen ? "Dark Mode 🌙" : "Light Mode ☀️"}
        </div>
      </motion.div>
    </div>
  );
}
