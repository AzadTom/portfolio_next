'use client';
import "./style.css";
import {motion} from "motion/react";

const page = () => {
  return (
    <div className="px-4 py-6">
      <div className="flex flex-col justify-center items-center">
        <motion.div initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1,transitionDelay:1}} className="w-full h-[450px] my-8">
          <video className="w-full h-full object-cover bg-cover  rounded-xl" loop autoPlay muted playsInline>
            <source
              src="https://cdn.pixabay.com/video/2024/05/18/212404_large.mp4"
              type="video/mp4"
            />
          </video>
        </motion.div>
        <CircleImageTransition />
        <HeadingTransition />
      </div>
      <ImageRevealTransition />
      <TextBlurEffect />
      <HorizontalTransition />
    </div>
  );
};

export default page;

const CircleImageTransition = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="bg-zinc-800 w-[100px] h-[100px] rounded-full flex justify-center items-center autoRotate">
        <img
          className="object-cover rounded-full aspect-square "
          src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
          alt="thumnail"
        />
      </div>
    </div>
  );
};

const HeadingTransition = () => {
  return (
    <div className="my-6">
      <h1 className="autoShow text-4xl sm:text-8xl font-bold text-start sm:text-center text-white">
        Just Watch , Less Talk
      </h1>
      <p className="text-start sm:text-center text-base font-light autoShow text-white">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
      </p>
    </div>
  );
};

const ImageRevealTransition = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-8  max-w-[1000px] mx-auto mt-8">
      <img
        className="flex-1  rounded-xl min-w-[300px] object-cover imageReveal"
        src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
        alt="image"
      />
      <img
        className="flex-1 rounded-xl min-w-[300px] object-cover imageReveal"
        src="https://images.unsplash.com/photo-1743254634621-bef84a1efe13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className="flex-1 rounded-xl min-w-[300px] object-cover imageReveal"
        src="https://images.unsplash.com/photo-1750375502807-2c73a829f182?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt="image"
      />
    </div>
  );
};

const TextBlurEffect = () => {
  return (
    <div className="text-white my-12">
      <h2 className="text-4xl sm:text-6xl font-bold  autoblur">Hello</h2>
      <h2 className="text-4xl sm:text-6xl font-bold autoblur">Munna</h2>
      <h2 className="text-4xl sm:text-6xl font-bold autoblur">Monsaters</h2>
      <h2 className="text-4xl sm:text-6xl font-bold autoblur">MothersDays</h2>
    </div>
  );
};

const HorizontalTransition = () => {
  return (
    <div className="horizontal-scroll-wrapper flex fadeUp">
      <img
        className="w-[300px] object-cover  fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1743254634621-bef84a1efe13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1750375502807-2c73a829f182?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className="w-[300px] object-cover  fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1743254634621-bef84a1efe13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1750375502807-2c73a829f182?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className="w-[300px] object-cover  fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1743254634621-bef84a1efe13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1750375502807-2c73a829f182?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className="w-[300px] object-cover  fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1743254634621-bef84a1efe13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1750375502807-2c73a829f182?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className="w-[300px] object-cover  fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1659959103888-ea4ab754e6f6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1743254634621-bef84a1efe13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8"
        alt="image"
      />
      <img
        className=" w-[300px] object-cover fadeUp rounded-xl"
        src="https://images.unsplash.com/photo-1750375502807-2c73a829f182?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
        alt="image"
      />
    </div>
  );
};
