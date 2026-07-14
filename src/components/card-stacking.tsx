"use client";
import { ReactLenis } from "lenis/react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1718969604981-de826f44ce15?w=1200&auto=format&fit=crop",
    top: "top-0",
    width: "w-[55%]",
  },
  {
    src: "https://images.unsplash.com/photo-1476180814856-a36609db0493?w=1200&auto=format&fit=crop",
    top: "top-[30px]",
    width: "w-[60%]",
  },
  {
    src: "https://images.unsplash.com/photo-1595407660626-db35dcd16609?w=1200&auto=format&fit=crop",
    top: "top-[60px]",
    width: "w-[65%]",
  },
  {
    src: "https://images.unsplash.com/photo-1599054799131-4b09c73a63cf?w=1200&auto=format&fit=crop",
    top: "top-[90px]",
    width: "w-[70%]",
  },
  {
    src: "https://images.unsplash.com/photo-1719963532023-01b573d1d584?w=1200&auto=format&fit=crop",
    top: "top-[120px]",
    width: "w-[75%]",
  },
  {
    src: "https://images.unsplash.com/photo-1714328101501-3594de6cb80f?w=1200&auto=format&fit=crop",
    top: "top-[150px]",
    width: "w-[80%]",
  },
];

export default function CardStacking() {
  return (
    <ReactLenis root>
      <main className="bg-white text-zinc-900">
        <div className="wrapper">
          <section className="text-zinc-900  h-screen  w-full bg-white  grid place-content-center sticky top-0">
            <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size-[54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

            <h1 className="2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]">
              CSS Sticky Properties for <br /> Stacking Cards. Scroll down! 👇
            </h1>
          </section>
        </div>

        <section className="text-zinc-900   w-full bg-white  ">
          {images.map(({ src, top, width }, index) => (
            <div key={index} className={`sticky ${top} w-full`}>
              <figure className="flex h-screen w-full items-center justify-center">
                <img
                  src={src}
                  alt=""
                  width={1200}
                  height={800}
                  className={` aspect-video rounded-md object-cover transition-all duration-300 ${
                    index === 1
                      ? "[box-shadow:0_-5px_16px_4px_rgba(0,0,0,0.8),0_2px_4px_-1px_rgba(0,0,0,0.06)]"
                      : ""
                  }`}
                />
              </figure>
            </div>
          ))}
        </section>

        <footer className="group bg-slate-950 ">
          <h1 className="text-[16vw]  translate-y-20 leading-[100%] uppercase font-semibold text-center bg-linear-to-r from-neutral-400 to-neutral-800 bg-clip-text text-transparent transition-all ease-linear">
            ui-layout
          </h1>
          <div className="bg-white h-40 relative z-10 grid place-content-center text-2xl rounded-tr-[100px] rounded-tl-[100px]"></div>
        </footer>
      </main>
    </ReactLenis>
  );
}
