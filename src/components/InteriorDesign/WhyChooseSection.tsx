"use client"

import { WHY_CHOOSE } from "./utils/utils"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1618220179428-22790b461013",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
]

const WhyChooseWithContact = () => {
  const triggerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end end"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"])

  return (
    <section className="relative pt-24 md:pt-32 bg-[linear-gradient(135deg,#F6F1EB,#EAE4DC)]">

      {/* MAIN WRAPPER */}
      <div className="">

        <div className="max-w-7xl mx-auto px-4 md:px-6 
          flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16">

          {/* 🔥 LEFT SIDE (FIXED PANEL) */}
          <div className="md:sticky md:top-0 md:h-screen flex items-center">

            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
                Why Choose Us
              </p>

              <h2 className="text-3xl md:text-6xl font-semibold mt-4 leading-tight">
                Built on <br /> Experience & Precision
              </h2>

              <p className="text-gray-600 mt-6 max-w-md">
                We craft thoughtful spaces that balance design and function.
              </p>
            </div>

          </div>

          {/* 🔥 RIGHT SIDE (SCROLL ONLY CARDS) */}
          <div className="flex flex-col">

            {WHY_CHOOSE.map((item, index) => (
              <div key={index} className="flex mt-5 items-center">

                <div className="sticky top-[120px] md:top-32 w-full">

                  <div className="bg-white rounded-[24px] md:rounded-[28px]
                    px-6 py-8 md:px-10 md:py-10 border border-gray-200
                    shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

                    {/* Image */}
                    <div className="mb-4 overflow-hidden rounded-xl">
                      <img
                        src={DEMO_IMAGES[index]}
                        alt=""
                        className="w-full h-40 md:h-56 object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="text-xs text-gray-400 mb-3">
                      0{index + 1}
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 mt-3">
                      {item.desc}
                    </p>

                  </div>

                </div>
              </div>
            ))}

            {/* 🔥 TRIGGER FOR CONTACT */}
            <div ref={triggerRef} className="h-[120vh]" />

          </div>

        </div>
      </div>

      {/* 🔥 CONTACT SLIDE OVER */}
      <motion.div
        style={{ y }}
        className="
          fixed 
          bottom-0 left-0 right-0 
          h-screen 
          bg-black text-white 
          flex items-center justify-center 
          z-50
        "
      >
        <div className="text-center max-w-2xl px-4">

          <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
            Get in Touch
          </p>

          <h2 className="text-3xl md:text-5xl font-semibold mt-4">
            Let’s Build Something Exceptional
          </h2>

          <p className="mt-6 text-gray-300">
            Tell us about your project and we’ll help you bring it to life.
          </p>

          <button className="mt-8 px-8 py-4 bg-white text-black rounded-full">
            Contact Us
          </button>

        </div>
      </motion.div>

    </section>
  )
}

export default WhyChooseWithContact