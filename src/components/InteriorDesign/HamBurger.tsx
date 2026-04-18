"use client"

import { motion } from "framer-motion"

interface Props {
  isOpen: boolean
  toggle: () => void
}   

const Hamburger = ({ isOpen }: Props) => {
  return (
    <div className="relative w-5 h-2.5 flex flex-col justify-between items-end">
      {/* Top Line */}
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 4.5 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[1.5px] bg-zinc-100 block origin-center rounded-full"
      />

      {/* Bottom Line (Staggered width when closed, expands to full width when forming X) */}
      <motion.span
        animate={{
          width: isOpen ? "100%" : "70%",
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -4.5 : 0,
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="h-[1.5px] bg-zinc-100 block origin-center rounded-full"
      />
    </div>
  )
}

export default Hamburger