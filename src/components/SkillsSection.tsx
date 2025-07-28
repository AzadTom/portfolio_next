'use client';
import { motion } from 'motion/react';

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

const SkillsSection = () => {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-20 outfit-500 max-w-[1000px] mx-auto">
      <div className="text-center mb-12 outfit-500">
        <h2 className="text-4xl font-bold mb-2 text-white">My Skills</h2>
        <p className="text-white/60 text-lg">Technologies I work with and love</p>
      </div>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 place-content-center place-items-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            className="w-full max-w-[160px] h-40 flex flex-col items-center justify-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:scale-105 transition-transform duration-300 text-center"
            whileHover={{ y: -4 }}
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
