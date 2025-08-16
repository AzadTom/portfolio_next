'use client';
import { skills } from '@/utils/utils';
import { motion } from 'motion/react';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 300,
      damping: 24,
    },
  },
};

const SkillsSection = () => {
  return (
    <section className="bg-black text-white py-16 px-6 outfit-600 max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
        className="mb-4 outfit-500"
      >
      <h2 className="text-3xl font-bold outfit-600  text-white">Stack</h2>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill?.name}
            variants={itemVariants}
            whileHover={{
              y: -8,
              rotateX: 8,
              rotateY: -8,
              transition: { type: 'spring', stiffness: 300 },
            }}
            className="text-center transform-gpu"
          >
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                width={100}
                height={100}
                src={skill?.logo}
                alt={skill?.name}
                className="w-full h-full object-contain"
              />
            </div>
            {/* <p className="text-white/80 text-sm">{skill.name}</p> */}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
