const CircleImageTransition = () => {
  return (
    <div className="flex justify-center items-center mt-12">
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


export default CircleImageTransition;