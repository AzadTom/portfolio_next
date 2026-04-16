"use client"

import { Phone, Clock, ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

const HeroInfoCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 w-[90%] md:w-auto"
    >
      <div
        className="
        flex flex-col md:flex-row 
        gap-6 md:gap-10 
        bg-white/80 backdrop-blur-xl 
        border border-white/30 
        shadow-[0_8px_30px_rgba(0,0,0,0.1)] 
        rounded-xl md:rounded-2xl 
        px-4 md:px-10 
        py-4 md:py-6
      "
      >
        {/* Phone Row */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">

          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 rounded-full bg-black/5">
              <Phone className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>

            <div>
              <p className="text-[10px] md:text-xs text-gray-500 tracking-wide">
                CALL US NOW
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-900">
                +91 9016112409
              </p>
            </div>
          </div>

          {/* External Icon */}
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
        </div>

        {/* Divider */}
        <div className="hidden md:block h-10 w-px bg-gray-200" />

        {/* Timing Row */}
        <div className="flex items-center justify-between w-full md:w-auto gap-4">

          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2 md:p-3 rounded-full bg-black/5">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>

            <div>
              <p className="text-[10px] md:text-xs text-gray-500 tracking-wide">
                OPENING HOURS
              </p>
              <p className="text-sm md:text-base font-semibold text-gray-900">
                Mon - Sat: 10 AM - 6 PM
              </p>
            </div>
          </div>

          {/* External Icon */}
          <ArrowUpRight className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
        </div>

      </div>
    </motion.div>
  )
}

export default HeroInfoCard