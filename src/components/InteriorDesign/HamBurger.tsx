"use client"

import { motion } from "framer-motion"

interface Props {
  isOpen: boolean
  toggle: () => void
}   

const Hamburger = ({ isOpen, toggle}: Props) => {
  return (
    <button
      onClick={toggle}
      className={`w-10 h-10 flex items-center justify-center`}
    >
      <div className="relative w-6 h-5">

        {/* Top Line */}
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            y: isOpen ? 8 : 0,
          }}
          className="absolute left-0 top-0 w-full h-[2px] bg-white rounded"
        />

        {/* Middle Line */}
        <motion.span
          animate={{
            opacity: isOpen ? 0 : 1,
          }}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-white rounded"
        />

        {/* Bottom Line */}
        <motion.span
          animate={{
            rotate: isOpen ? -45 : 0,
            y: isOpen ? -8 : 0,
          }}
          className="absolute left-0 bottom-0 w-full h-[2px] bg-white rounded"
        />

      </div>
    </button>
  )
}

export default Hamburger