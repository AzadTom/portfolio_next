"use client"

import { WHY_CHOOSE } from "./utils/utils"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  "https://images.unsplash.com/photo-1618220179428-22790b461013",
  "https://images.unsplash.com/photo-1615874959474-d609969a20ed",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf",
]

/* 🔥 SLICK DESKTOP IMAGE BLOCK */
const DesktopScrollImage = ({ item, index, activeIndex, setActiveIndex }: any) => {
  // Using a robust active state check directly derived from props
  const isActive = activeIndex === index;

  return (
    <motion.div 
      // Guarantee the active index fires when this element securely dominates 50% of the viewport
      onViewportEnter={() => setActiveIndex(index)}
      viewport={{ amount: 0.5, margin: "0px" }}
      className="h-[85vh] md:h-screen w-full flex items-center justify-center p-8 md:p-12 xl:p-24 relative snap-center"
    >
      <motion.div 
        animate={{ scale: isActive ? 1 : 0.85 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full h-full max-h-[70vh] md:max-h-[85vh] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.08)] border border-zinc-200 relative transition-opacity duration-700 ${isActive ? 'opacity-100 z-10' : 'opacity-40 z-0'}`}
      >
        <img 
          src={DEMO_IMAGES[index % DEMO_IMAGES.length]} 
          alt={item.title || "interior design"}
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette over images */}
        <div className="absolute inset-0 bg-black/[0.03]" />
      </motion.div>
    </motion.div>
  )
}

const WhyChooseWithContact = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="relative bg-[linear-gradient(135deg,#F6F1EB,#EAE4DC)] text-zinc-900">
      
      {/* 🔥 EXCLUSIVE DESKTOP PARALLAX SCROLL-SPY LAYOUT */}
      <div className="hidden md:grid md:grid-cols-12 relative max-w-[110rem] mx-auto z-10">
        
        {/* LEFT FIXED TEXT SPY */}
        <div className="col-span-5 relative">
          <div className="sticky top-0 h-screen flex flex-col justify-center px-8 lg:px-12 xl:px-24">
            
            {/* Permanent Section Intro */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-4 h-4 text-zinc-400" />
                <p className="text-xs tracking-[0.3em] uppercase text-zinc-400 font-semibold">
                  Why Choose Us
                </p>
              </div>
              <h2 className="text-5xl xl:text-6xl font-light leading-[1.1] text-zinc-900 mb-6 tracking-tight">
                Built on <br/>
                <span className="font-serif italic text-zinc-500 font-normal">Experience & Precision.</span>
              </h2>
              <div className="w-16 h-[2px] bg-zinc-200" />
            </div>

            {/* 🔥 AnimatePresence dynamically hot-swaps the active text with a beautiful sliding animation */}
            <div className="min-h-[250px] relative">
              {/* mode="wait" ensures previous text completely finishes fading out before new text appears, preventing overlap! */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute inset-x-0 top-0 flex flex-col justify-start"
                >
                  <div className="flex items-center gap-4 mb-4">
                     <span className="text-3xl font-light text-zinc-400 font-serif italic">
                       0{activeIndex + 1}
                     </span>
                     <div className="h-[1px] w-8 bg-zinc-300" />
                  </div>
                  
                  <h4 className="text-3xl xl:text-4xl font-semibold text-zinc-900 mb-4 tracking-tight">
                    {WHY_CHOOSE[activeIndex]?.title || ""}
                  </h4>
                  <p className="text-zinc-500 text-base xl:text-lg font-medium leading-relaxed max-w-md">
                    {WHY_CHOOSE[activeIndex]?.desc || ""}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

        {/* RIGHT SCROLLING GALLERIES */}
        <div className="col-span-7 flex flex-col relative z-10 border-l border-zinc-200/50">
          {WHY_CHOOSE.map((item, index) => (
            <DesktopScrollImage 
               key={index} 
               item={item} 
               index={index} 
               activeIndex={activeIndex}
               setActiveIndex={setActiveIndex} 
            />
          ))}
        </div>
      </div>

      {/* 🔥 RESPONSIVE MOBILE LAYOUT */}
      <div className="md:hidden flex flex-col px-6 py-20 relative z-10">
         <div className="mb-16">
            <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-400 font-bold mb-4">Why Choose Us</p>
            <h2 className="text-4xl font-light leading-[1.1] text-zinc-900">
               Built on <br/>
               <span className="font-serif italic text-zinc-500 font-normal">Experience & Precision.</span>
            </h2>
         </div>

         <div className="flex flex-col gap-16 relative z-10">
            {WHY_CHOOSE.map((item, index) => (
               <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                  className="flex flex-col group gap-2"
               >
                  <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-4 relative border border-zinc-200 shadow-[0_10px_40px_rgba(0,0,0,0.06)]">
                     <img 
                        src={DEMO_IMAGES[index % DEMO_IMAGES.length]} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                     />
                     <div className="absolute inset-0 bg-black/[0.03]" />
                     
                     <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-sm">
                        <span className="text-zinc-900 text-xs font-bold">0{index + 1}</span>
                     </div>
                  </div>

                  <h4 className="text-2xl font-semibold text-zinc-900 mb-2 tracking-tight">{item.title}</h4>
                  <p className="text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
               </motion.div>
            ))}
         </div>
      </div>

      {/* 🔥 STATIC CONTACT BLOCK ALIGNED TO NORMAL SCROLL FLOW */}
      <div
        className="
          w-full relative 
          py-32 lg:py-48
          bg-[#18181b] border-t border-zinc-800
          text-white 
          flex items-center justify-center 
          z-20
        "
      >
        <div className="text-center max-w-2xl px-6 relative z-10 flex flex-col items-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-bold mb-4">
            Get in Touch
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] tracking-tight">
            Let’s Build Something <br className="hidden md:block" />
            <span className="font-serif italic font-normal text-zinc-400">Exceptional.</span>
          </h2>

          <p className="mt-6 text-zinc-400 font-medium text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Tell us about your next visionary project and we’ll help you bring it to life with precision.
          </p>

          <button className="mt-10 group relative px-10 py-4 bg-white text-black rounded-full overflow-hidden transition-all hover:scale-[1.02] duration-300">
            <span className="relative z-10 flex items-center gap-3 font-semibold text-sm tracking-wide text-zinc-900">
              Contact Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>

    </section>
  )
}

export default WhyChooseWithContact