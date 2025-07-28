'use client';
import { webContent } from "@/utils/utils";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";



const ProjectSection = () => {
  return (
    <div className="my-[32px] scroll-m-8" id="works">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 outfit-500">
        <h2 className="text-4xl font-bold mb-2 text-white">Projects</h2>
        <p className="text-white/60 text-lg outfit-300">
          A showcase of my work, passion, and what I love building with
        </p>
      </motion.div>
      <div className="flex gap-4 sm:grid sm:grid-cols-3 overflow-scroll sm:justify-center items-center mx-4 sm:mx-6">
        {webContent.map((item) => (
          <ProjectItem {...item} key={item.name} />
        ))}
      </div>
    </div>
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
      className="shrink-0 w-[350px] sm:w-[450px] mt-6">
      <Image src={img} width={300} height={250} alt={name} className="w-full h-[250px] sm:h-[350px] object-cover" />
      <div className="flex justify-center gap-4 mt-4 items-center">
        <button className="bg-white text-black px-4 py-2 rounded-xl outfit-500 capitalize flex  gap-1 items-center"><a href={live}>Live Link</a>  <ExternalLink /></button>
        <button className="border border-white rounded-xl outfit-500 capitalize text-white px-4 py-2 flex gap-1 items-center"><a href={github}>Github</a>  <ExternalLink /></button>
      </div>
    </motion.div>
  )

}