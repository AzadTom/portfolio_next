'use client';

import { webContent } from "@/utils/utils";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";




const ProjectSection = () => {
  return (
    <>
      <div className="my-[32px] scroll-m-8 max-w-[1000px] mx-auto" id="works">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="outfit-600">
          <h2 className="text-3xl font-bold outfilt-600 mb-2 text-white px-4">Projects <span className="text-white/50 text-xl">({webContent.length})</span></h2>
        </motion.div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={20}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active custom-bullet-active",
          }}
          breakpoints={{
            768: {
              slidesPerView: 2,
            },
          }}
          className="w-full mx-auto"
        >
          {webContent.map((item) => (
            <SwiperSlide key={item.name} className="flex justify-center">
              <ProjectItem {...item} />
            </SwiperSlide>
          ))}

          {/* Custom Arrows */}
          <div className="swiper-button-prev-custom text-black bg-white p-2 rounded-full shadow absolute left-2 top-1/2 z-10 -translate-y-1/2 cursor-pointer">
            <ChevronLeft size={24} />
          </div>
          <div className="swiper-button-next-custom text-black bg-white p-2 rounded-full shadow absolute right-2 top-1/2 z-10  -translate-y-1/2 cursor-pointer">
            <ChevronRight size={24} className="" />
          </div>
        </Swiper>
      </div>

    </>
  )
}

export default ProjectSection


const ProjectItem = ({ name, img, github, live }: { img: string, name: string, github: string, live: string }) => {

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full mt-6 mx-auto">
      <Image src={img} width={300} height={250} alt={name} className="w-full h-[250px] sm:h-[350px] object-cover  aspect-square" />
      <div className="flex justify-center gap-4 mt-4 items-center">
        <button className="bg-white text-black px-4 py-2 rounded-full outfit-500 capitalize flex  gap-1 items-center"><a href={live}>Live Link</a>  <ExternalLink /></button>
        <button className="border border-white rounded-full outfit-500 capitalize text-white px-4 py-2 flex gap-1 items-center"><a href={github}>Github</a>  <ExternalLink /></button>
      </div>
    </motion.div>
  )

}