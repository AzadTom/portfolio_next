'use client';
import { cn } from '@/lib/utils';
import React from 'react'
import { Button } from '../ui/button';
import { Heading } from '@/components/designSytem/DesignSytem';

const HeroSection1 = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-white [--pattern:var(--color-neutral-300)]">
         <div className="max-w-7xl mx-auto w-full h-full relative flex justify-center items-center">
             <HorizontalScale className="absolute top-0 w-screen mx-auto"/>
             <HorizontalScale className="absolute bottom-0 w-screen mx-auto"/>
             <VerticalScale className="absolute left-0 h-screen mx-auto"/>
             <VerticalScale className="absolute right-0 h-screen mx-auto"/>
             <div className="p-10 size-full">
                 <div className="px-4 py-10 md:px-10 size-full relative shadow-2xl flex flex-col justify-between">
                  <img className="absolute inset-0 w-full h-full object-cover mask-radial-from-50% mask-b-from-50% mask-t-from-20% select-none pointer-events-none" src="https://images.unsplash.com/photo-1782392455081-a09db8267afb?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="heroimg" />
                  <nav className="flex justify-end z-50 relative">
                    <Button className="px-4 py-2 rounded-md bg-gradient-to-t from-blue-700 to-blue-500 text-shadow-lg text-shadow-black/2 text-white  text-base">Try for free</Button>
                  </nav>
                  <div className="flex flex-col relative z-50">
                      <Heading className="text-neutral-950 max-w-4xl">
                        The only AI capable of deep cloning voice.
                      </Heading>
                      <Heading variant={"lead"} as={"p"} className="max-w-2xl text-neutral-800 mt-8">
                         Pass in a URL,and Deep cloning AI will clone the voice of the person in the credit card required.
                      </Heading>
                      <div className="mt-8 flex flex-col  gap-5 md:flex-row md:items-center">
                        <Button variant={"secondary"} className="capitalize text-neutral-800">No Credit card required</Button>
                        <Button className="px-4 py-2 rounded-md bg-gradient-to-t from-blue-700 to-blue-500 text-shadow-lg text-shadow-black/2 text-white  text-base cursor-pointer active:scale-98 transition-duration">Try for free</Button>
                      </div> 
                  </div>
                 <Lines className="mask-b-from-10% absolute  inset-x-0 top-0"/>
                 <Lines className="mask-t-from-10% absolute  inset-x-0 bottom-0"/>
                 </div>
             </div>
         </div>
    </section>
  )
}

export default HeroSection1



const Lines = ({className=""}:{className?:string})=>{

  return(
      <div className={cn("h-10 w-full  bg-[repeating-linear-gradient(to_bottom,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_0.5rem)]",className)}/>
  )
}
const HorizontalScale = ({className=""}:{className?:string})=>{

  return(
    <div className={cn("h-10 w-full bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-[size:10px_10px] border-y  border-[var(--pattern)]",className)}/>
  )
}

const VerticalScale = ({className=""}:{className?:string})=>{

  return(
    <div className={cn("w-10 h-full bg-[repeating-linear-gradient(315deg,var(--pattern)_0,var(--pattern)_1px,transparent_1px,transparent_50%)] bg-[size:10px_10px] border-x  border-[var(--pattern)]",className)}/>
  )
}