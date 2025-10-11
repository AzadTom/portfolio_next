import React from 'react'
import './style.css';

const GridLines = () => {
  return (
    <section>
      <div className='gridLine'></div>
      <FluidTypoHeroSection />
      <Top7Tips/>
    </section>
  )
}

export default GridLines



function FluidTypoHeroSection() {

  return (
    <section className='w-full h-svh text-white flex flex-col items-center justify-center text-center'>
      <h1 className='text-[clamp(48px,5vw,76px)] font-bold capitalize'>The React Framework for the Web</h1>
      <p className='text-[clamp(21px,2vw,28px)]'>Used by some of the world's largest companies, Next.js enables you to create high-quality web applications with the power of React components.</p>
      <div className='text-base flex gap-3 items-center mt-4'>
        <button className='bg-white text-black px-4 py-2 rounded'>Get Started</button>
        <button className='border rounded text-white px-4 py-2'>Learn Next.js</button>
      </div>
      <div>
        <GradientTracing/>
      </div>
    </section>
  );

}


function GradientTracing() {


  return (
    <svg width="317" height="80" viewBox="0 0 317 80" fill="none">
      <path
        d="M316 0V10C316 12.2091 314.209 14 312 14H5C2.79086 14 1 15.7909 1 18V80"
        stroke="black"
        stroke-opacity="0.2"
      />
      <path
        d="M316 0V10C316 12.2091 314.209 14 312 14H5C2.79086 14 1 15.7909 1 18V80"
        stroke="url(#pulse)"
        stroke-linecap="round"
        stroke-width="2"
      />
      <defs>
        <linearGradient
          id="pulse"
          gradientUnits="userSpaceOnUse"
          x1="0"
          x2="0"
          y1="30"
          y2="60"
        >
          <stop stop-color="#2EB9DF" stop-opacity="0" />
          <stop stop-color="#2EB9DF" />
          <stop offset="1" stop-color="#9E00FF" stop-opacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )

}


function Top7Tips(){

  return(
    <section>
        <section className='max-w-[1000px] mx-auto bg-white  h-[50vh] flex flex-col  gap-3 justify-center items-center'>
          <div>
            <p className='font-bold text-2xl'>1. Scale your button</p>
          </div> 
           <button className='select-none rounded-full bg-[#171717] px-6 py-2 font-medium text-white transition-[background-color,transform] hover:bg-[#232323] active:scale-[0.97] cursor-pointer'>Paste</button>
        </section>
        <section className='max-w-[1000px] mx-auto bg-white h-[50vh] flex flex-col gap-3 justify-center items-center mt-4'>
            <div>
            <p className='font-bold text-2xl'>{"2. Don't animate from scale(0)"}</p>
          </div>   
            <div className='flex gap-3'>
              <button className='shadow-md rounded-full px-6 py-2  text-black border font-medium'>Options</button>
               <button className='shadow-md rounded-full px-6 py-2  text-black border font-medium'>Options</button>
            </div>
        </section>
    </section>
  )

}