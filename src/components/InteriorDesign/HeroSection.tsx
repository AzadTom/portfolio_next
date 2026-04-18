"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import HeroInfoCard from "./HeroInfoCard"
import ButtonInteraction from "@/components/button/ButtonInteraction"

const images = [
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2500",
  "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2500",
  "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=2500",
]

const HeroSection = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[100vh] overflow-hidden bg-black">
      
      {/* Background Image Slider with Slow Ken Burns Effect */}
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="Luxury Interior"
          className="absolute inset-0 w-full h-full object-cover origin-center"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Elegant Gradient Overlays for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto h-full px-6 md:px-12 lg:px-16 pt-24 pb-12">

        {/* Vertically centered Typography Content */}
        <div className="h-full flex flex-col justify-center text-white max-w-2xl gap-6 md:gap-8 lg:mt-[-40px]">
          
          {/* Eyebrow Label */}
          <motion.div
            key={index + "-eyebrow"}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-4"
          >
            <div className="w-12 h-[1px] bg-white/60" />
            <span className="text-xs md:text-sm tracking-[0.4em] text-white/80 uppercase font-light">
              Premium Interior Studio
            </span>
          </motion.div>

          {/* Epic Main Typography */}
          <motion.h1
            key={index + "-title"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light leading-[1.05] tracking-tight"
          >
            Build Experiences <br /> 
            That People <span className="font-serif italic font-normal text-white/90">Remember</span>
          </motion.h1>

          <motion.p
            key={index + "-desc"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: "easeOut" }}
            className="text-white/70 text-lg md:text-xl font-light max-w-lg leading-relaxed"
          >
            We design and curate modern interior spaces that help your property stand out with exceptional aesthetics and functionality.
          </motion.p>

          <motion.div
            key={index + "-btn"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
            className="flex flex-wrap items-center gap-5 mt-4"
          >
            {/* Using the custom ButtonInteraction component */}
            <ButtonInteraction name="Us" />

            {/* Simple outline button */}
            <button className="px-8 py-2.5 rounded-lg text-sm font-medium tracking-wide text-white border border-white/30 hover:bg-white/10 hover:border-white/50 transition-all">
              View Work
            </button>
          </motion.div>

        </div>

        {/* Integrated Info Card placed perfectly at the bottom left block */}
        {/* <div className="absolute bottom-8 md:bottom-12 left-6 md:left-12 lg:left-16 z-30">
          <HeroInfoCard />
        </div> */}

        {/* Right Side Vertical Indicators */}
        <div className="absolute right-6 md:right-12 bottom-1/2 translate-y-1/2 flex flex-col gap-4 z-20 hidden lg:flex">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-700 rounded-full ${
                i === index ? "h-10 w-1.5 bg-white" : "h-2 w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default HeroSection
