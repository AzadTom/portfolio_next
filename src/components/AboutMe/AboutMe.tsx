import React from "react";

const AboutMe = () => {
  return (
    <section id="aboutme" className="py-16 px-4 sm:px-8 max-w-3xl mx-auto text-white">
      <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-6 outfit-500">
        about me.
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed space-y-4 flex flex-col gap-4 outfit-400 text-[#a3a3a3]">
        <span>
          Hey! I&#39;m a frontend developer passionate about building scalable
          websites and applications. I focus on delivering exceptional user
          experiences, beautiful interfaces, and seamless developer workflows.
          <span className="hidden sm:inline">
            {" "}
            I thrive at the intersection of design and engineering—creating
            products that are both visually appealing and technically sound.
          </span>
        </span>
        <span>
          Outside of coding, you&#39;ll often find me diving into books or exploring
          immersive online games. I’m always curious and love learning through
          creativity and collaboration.
        </span>
      </p>
    </section>
  );
};

export default AboutMe;
