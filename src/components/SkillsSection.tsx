'use client';
import { motion } from 'framer-motion';

const skills = [
  { name: 'HTML', logo: 'https://cdn.simpleicons.org/html5/E34F26' },
  { name: 'CSS', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg' },
  { name: 'JavaScript', logo: 'https://cdn.simpleicons.org/javascript/F7DF1E' },
  { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript/3178C6' },
  { name: 'ReactJS', logo: 'https://cdn.simpleicons.org/react/61DAFB' },
  { name: 'NextJS', logo: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF' },
  { name: 'Framer Motion', logo: 'https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png' },
  { name: 'Redux', logo: 'https://cdn.simpleicons.org/redux/764ABC' },
  { name: 'React Query', logo: 'https://cdn.simpleicons.org/reactquery/FF4154' },
  { name: 'NodeJS', logo: 'https://cdn.simpleicons.org/nodedotjs/339933' },
  { name: 'MongoDB', logo: 'https://cdn.simpleicons.org/mongodb/47A248' },
  { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql/4479A1' },
];

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
    <section className="bg-black text-white py-16 px-6 md:px-20 outfit-500 max-w-[1000px] mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12 outfit-500"
      >
        <h2 className="text-4xl font-bold mb-2 text-white">My Skills</h2>
        <p className="text-white/60 text-lg outfit-300">Technologies I work with and love</p>
      </motion.div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-content-center place-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            variants={itemVariants}
            whileHover={{
              y: -8,
              rotateX: 8,
              rotateY: -8,
              transition: { type: 'spring', stiffness: 300 },
            }}
            className="w-full max-w-[160px] h-40 flex flex-col items-center justify-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 shadow-md text-center transform-gpu"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-white/80 text-sm">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
