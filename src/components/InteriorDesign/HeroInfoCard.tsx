"use client"

import { Phone, Clock } from "lucide-react"
import { motion } from "framer-motion"

const HeroInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 1, ease: "easeOut" }}
      className="inline-block"
    >
      <div
        className="
        inline-flex flex-col sm:flex-row 
        gap-4 sm:gap-10 
        bg-black/40 backdrop-blur-xl 
        border border-white/20 
        shadow-[0_8px_40px_rgba(0,0,0,0.4)] 
        rounded-2xl sm:rounded-full 
        px-6 sm:px-8 
        py-4 sm:py-4
      "
      >
        {/* Phone Section */}
        <div className="flex items-center gap-4 group cursor-pointer transition-opacity hover:opacity-80">
          <div className="p-2.5 rounded-full bg-white/10">
            <Phone className="w-4 h-4 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] text-white/50 tracking-[0.2em] font-medium uppercase">
              Start a Conversation
            </span>
            <span className="text-sm font-light text-white tracking-wider mt-0.5">
              +91 90161 12409
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px bg-white/20" />

        {/* Timing Section */}
        <div className="flex items-center gap-4">
          <div className="p-2.5 rounded-full bg-white/10">
            <Clock className="w-4 h-4 text-white" />
          </div>

          <div className="flex flex-col">
            <span className="text-[9px] sm:text-[10px] text-white/50 tracking-[0.2em] font-medium uppercase">
              Studio Hours
            </span>
            <span className="text-sm font-light text-white tracking-wider mt-0.5">
              Mon - Sat: 10 AM - 6 PM
            </span>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default HeroInfoCard