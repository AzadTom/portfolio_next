const ContactSection = () => {
  return (
    <section className="
      bg-black 
      text-white 
      min-h-screen 
      flex items-center justify-center 
      px-4
    ">

      <div className="text-center max-w-2xl">

        <p className="text-xs tracking-[0.2em] uppercase text-gray-400">
          Get in Touch
        </p>

        <h2 className="text-3xl md:text-5xl font-semibold mt-4 leading-tight">
          Let’s Build Something Exceptional
        </h2>

        <p className="mt-6 text-gray-300">
          Tell us about your project and we’ll help you bring it to life.
        </p>

        <button className="
          mt-8 px-8 py-4 
          bg-white text-black 
          rounded-full font-medium
          hover:scale-105 transition
        ">
          Contact Us
        </button>

      </div>

    </section>
  );
}

export default ContactSection;