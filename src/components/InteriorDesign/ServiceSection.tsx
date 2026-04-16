"use client"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ServiceCard from "./ServiceCard"
import { SERVICES } from "./utils/utils"
import { useHorizontalScroll } from "./hooks/useHorizontalScroll"

const ServicesSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    useHorizontalScroll({ containerRef, scrollRef })

    const scroll = (direction: "left" | "right"): void => {
        if (!scrollRef.current) return

        const width = scrollRef.current.clientWidth

        scrollRef.current.scrollBy({
            left: direction === "left" ? -width : width,
            behavior: "smooth",
        })
    }

    return (
        <section
            ref={containerRef}
            className="relative h-[200vh] bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.9)_0%,transparent_50%),linear-gradient(135deg,#F6F1EB,#EAE4DC)]"
        >
            <div className="sticky top-0 pt-16 md:pt-20">

                <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">

                        {/* Left */}
                        <div className="max-w-xl space-y-4">
                            <p className="text-sm uppercase tracking-widest text-gray-500">
                                Our Expertise
                            </p>

                            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                                Crafting Spaces That <br /> Inspire & Function
                            </h2>

                            <p className="text-gray-600 text-sm md:text-base">
                                At Unity Interiors, we combine creativity and precision to deliver
                                exceptional architectural and interior design solutions for
                                residential and commercial spaces.
                            </p>
                        </div>

                        {/* Right Controls */}
                        <div className="flex gap-3 self-end">
                            <button
                                onClick={() => scroll("left")}
                                className="p-3 rounded-full border hover:bg-gray-100 transition"
                            >
                                <ChevronLeft />
                            </button>

                            <button
                                onClick={() => scroll("right")}
                                className="p-3 rounded-full border hover:bg-gray-100 transition"
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </div>

                    {/* Cards */}
                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-hidden"
                    >
                        {SERVICES.map((service) => (
                            <div
                                key={service.id}
                                className="shrink-0 w-[85%] sm:w-[70%] md:w-[400px]"
                            >
                                <ServiceCard service={service} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ServicesSection