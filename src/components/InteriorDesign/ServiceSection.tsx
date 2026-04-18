"use client"
import { useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import ServiceCard from "./ServiceCard"
import { SERVICES } from "./utils/utils"
// Ensure the horizontal scroll hook exists and is used
import { useHorizontalScroll } from "./hooks/useHorizontalScroll"

const ServicesSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useHorizontalScroll({ containerRef, scrollRef })

    const scroll = (direction: "left" | "right"): void => {
        if (!scrollRef.current) return
        const width = scrollRef.current.clientWidth / 1.5 // Scroll by partial width for better flow
        scrollRef.current.scrollBy({
            left: direction === "left" ? -width : width,
            behavior: "smooth",
        })
    }

    return (
        <section
            ref={containerRef}
            className="relative bg-white text-zinc-900 border-t border-zinc-100 pt-24 pb-32 md:pt-32 md:pb-40"
        >
            <div className="flex flex-col">

                <div className="max-w-[85rem] mx-auto px-6 lg:px-12 w-full flex-shrink-0">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">

                        {/* Left */}
                        <div className="max-w-2xl">
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="flex items-center gap-4 mb-8"
                            >
                                <div className="w-8 h-[1px] bg-zinc-400" />
                                <p className="text-xs tracking-[0.3em] uppercase text-zinc-500 font-medium">
                                    Our Expertise
                                </p>
                            </motion.div>

                            <motion.h2 
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1 }}
                                className="text-4xl md:text-xl lg:text-[4.5rem] font-light leading-[1.05] tracking-tight text-zinc-900"
                            >
                                Crafting Spaces That <br />
                                <span className="font-serif italic font-normal text-zinc-800 pr-2">Inspire & Function</span>
                            </motion.h2>
                        </div>

                        {/* Right Controls & Desc */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="flex flex-col items-start md:items-end gap-8"
                        >
                            <p className="text-zinc-500 font-light text-sm md:text-base max-w-sm text-left md:text-right leading-relaxed hidden sm:block">
                                At Unity Interiors, we combine creativity and precision to deliver exceptional architectural and interior design solutions.
                            </p>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => scroll("left")}
                                    className="group p-4 rounded-full border border-zinc-200 hover:border-zinc-900 transition-colors duration-300 flex items-center justify-center"
                                    aria-label="Scroll left"
                                >
                                    <ArrowLeft className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300" />
                                </button>

                                <button
                                    onClick={() => scroll("right")}
                                    className="group p-4 rounded-full border border-zinc-200 hover:border-zinc-900 transition-colors duration-300 flex items-center justify-center"
                                    aria-label="Scroll right"
                                >
                                    <ArrowRight className="w-5 h-5 text-zinc-400 group-hover:text-zinc-900 transition-colors duration-300" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Cards Container */}
                <div className="w-full flex-grow relative overflow-hidden max-w-7xl mx-auto">
                    {/* Subtle aesthetic fading edges */}
                    <div className="absolute top-0 bottom-0 left-0 w-6 md:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-6 md:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                    <div
                        ref={scrollRef}
                        className="flex gap-6 md:gap-10 overflow-x-auto snap-x snap-mandatory px-6 md:px-12 w-full h-full items-start"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {SERVICES.map((service, index) => (
                            <div
                                key={service.id || index}
                                className="shrink-0 w-[85vw] sm:w-[60vw] md:w-[45vw] lg:w-[450px] snap-center md:snap-start h-[65vh] md:h-[60vh]"
                            >
                                <ServiceCard service={service} index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesSection