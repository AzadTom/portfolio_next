"use client"
import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import HeroInfoCard from "./HeroInfoCard"

const images = [
  "https://unityinteriors.com/wp-content/uploads/2015/12/slider4.jpg",
  "https://unityinteriors.com/wp-content/uploads/2023/06/Untitled-design-8-min.png",
]

const HeroSection = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[100vh] overflow-hidden">
      <HeroInfoCard/>
      {/* Background Images */}
      <AnimatePresence>
        <motion.img
          key={index}
          src={images[index]}
          alt="hero"
          className="absolute w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center px-4 md:px-8">

        <div className="text-white max-w-xl flex flex-col gap-6">

          <motion.h1
            key={index + "-title"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-bold leading-tight"
          >
            Build Experiences That People Remember
          </motion.h1>

          <motion.p
            key={index + "-desc"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-gray-200 text-lg"
          >
            We design and develop modern digital products that help brands grow faster and stand out.
          </motion.p>

          <motion.div
            key={index + "-btn"}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="flex gap-4"
          >
            <button className="bg-white text-black px-6 py-3 rounded-full hover:scale-105 transition">
              Request a Project
            </button>

            <button className="border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition">
              View Work
            </button>
          </motion.div>

        </div>

      </div>
    </section>
  )
}

export default HeroSection
