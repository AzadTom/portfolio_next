"use client"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const ServiceCard = ({ service, index }: any) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index ? index * 0.1 : 0 }}
            className="flex flex-col h-full group cursor-pointer"
        >
            {/* Image Wrapper */}
            <div className="relative w-full aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl md:rounded-[2rem] bg-zinc-100 mb-6 md:mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_60px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover origin-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
                
                {/* Reveal Arrow Top Right on Hover */}
                <div className="absolute top-6 right-6 w-12 h-12 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out z-10 shadow-lg hidden md:flex">
                    <ArrowUpRight className="w-5 h-5 text-zinc-900" />
                </div>

                {/* Subtle internal gradient to anchor the empty space */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>

            {/* Content Area */}
            <div className="flex flex-col items-start px-2">
                <div className="flex items-center justify-between w-full mb-3">
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-zinc-900 group-hover:text-black transition-colors duration-300">
                        {service.title}
                    </h3>
                    <span className="text-zinc-400 font-light text-sm tracking-widest hidden sm:block">
                        0{index + 1}
                    </span>
                </div>
                
                <p className="text-zinc-500 font-light leading-relaxed text-sm md:text-[15px] lg:text-base max-w-sm line-clamp-3">
                    {service.description}
                </p>

                <div className="mt-6 w-10 h-[1px] bg-zinc-300 group-hover:w-24 group-hover:bg-zinc-800 transition-all duration-500 ease-out" />
            </div>
        </motion.div>
    )
}

export default ServiceCard