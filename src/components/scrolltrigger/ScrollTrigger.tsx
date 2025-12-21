'use client';
import './style.css';
import _ScrollTrigger from 'gsap/ScrollTrigger';
import Navigation from './Navigation';
import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";


const frameCount = 777;
const currentFrame = (index: number) =>
    `/scence_image2/scene${(index + 1).toString().padStart(5, "0")}.jpg`;


const ScrollTrigger = () => {

    const videoFrames = useRef({ frame: 0 });
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const imagesToload = useRef(frameCount);
    const canvasref = useRef<HTMLCanvasElement | null>(null);
    const navRef = useRef<HTMLDivElement | null>(null);
    const herocontentref = useRef<HTMLDivElement | null>(null);
    const heroimgcontainerref = useRef<HTMLImageElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);


    const setupscrollTrigger = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {

        _ScrollTrigger.create({
            trigger: ".hero-section",
            start: "top top",
            end: `+=${window.innerHeight * 7}px`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const animationProgress = Math.min(progress / 0.9, 1);
                const targetFrame = Math.round(animationProgress * (frameCount - 1));
                videoFrames.current.frame = targetFrame;
                render(canvas, context);
                if (progress <= 0.1) {
                    const navprogress = progress / 0.1;
                    const opacity = 1 - navprogress;
                    gsap.set(navRef.current, { opacity });

                } else {
                    gsap.set(navRef.current, { opacity: 0 });
                }

                const zTranslate = gsap.utils.mapRange(0, 0.25, 0, -500, progress);
                const opacity = gsap.utils.mapRange(0.2, 0.25, 1, 0, progress);
                const scale = gsap.utils.mapRange(0, 0.25, 1, 0.8, progress);
                gsap.set(herocontentref.current, {
                    opacity: gsap.utils.clamp(0, 1, opacity),
                    transform: `translate(-50%, -50%) translateZ(${gsap.utils.clamp(-500, 0, zTranslate)}px) scale(${gsap.utils.clamp(0.8, 1, scale)})`,
                });

                if (progress < 0.6) {
                    gsap.set(heroimgcontainerref.current, {
                        transform: "translateZ(1000px)",
                        opacity: 0,

                    })
                } else if (progress >= 0.6 && progress <= 0.9) {

                    const imgProgress = (progress - 0.6) / 0.3;
                    const translateZ = 1000 - imgProgress * 1000;

                    let opacity = 0;

                    if (progress <= 0.8) {
                        const opacityProgress = (progress - 0.6) / 0.2;
                        opacity = opacityProgress;
                    } else {

                        opacity = 1;

                    }

                    gsap.set(heroimgcontainerref.current, {
                        transform: `translateZ(${translateZ}px)`,
                        opacity,
                    });
                } else {

                    gsap.set(heroimgcontainerref.current, {
                        transform: `translateZ(0px)`,
                        opacity: 1,
                    })
                }
            }
        })
    }

    const render = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        if (canvas && context) {
            const canvasWidth = window.innerWidth;
            const canvasheight = window.innerHeight;
            context.clearRect(0, 0, canvasWidth, canvasheight);
            const img = imagesRef.current[videoFrames.current.frame];
            if (img && img.complete && img.naturalWidth > 0) {

                const imgAspect = img.naturalWidth / img.naturalHeight;
                const canvasAspect = canvasWidth / canvasheight;

                let drawWidth, drawHeigh, drawX, drawY;

                if (imgAspect > canvasAspect) {

                    drawHeigh = canvasheight;
                    drawWidth = drawHeigh * imgAspect;
                    drawX = (canvasWidth - drawWidth) / 2;
                    drawY = 0;

                } else {

                    drawWidth = canvasWidth;
                    drawHeigh = drawWidth / imgAspect;
                    drawX = 0;
                    drawY = (canvasheight - drawHeigh) / 2;
                }
                context.drawImage(img, drawX, drawY, drawWidth, drawHeigh);
            }
        }
    }

    const setCanvasSize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        const pixelRatio = window.devicePixelRatio || 1;
        if (canvas && context) {
            canvas.width = window.innerWidth * pixelRatio;
            canvas.height = window.innerHeight * pixelRatio;
            canvas.style.width = window.innerWidth + "px";
            canvas.style.height = window.innerHeight + "px";
            context.scale(pixelRatio, pixelRatio);
        }
    }



    const onLoad = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        imagesToload.current--;
        if (!imagesToload.current) {
            render(canvas, context);
            setupscrollTrigger(canvas, context);
            setIsLoading(false);
        }
    }

    const loadFrames = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D) => {
        imagesRef.current = [];
        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.onload = () => onLoad(canvas, context);
            img.onerror = () => onLoad(canvas, context);
            img.src = currentFrame(i);
            imagesRef.current[i] = img;
        }
    };


    useEffect(() => {
        const canvas = canvasref.current;
        if (!canvas) return;
        const context = canvas.getContext("2d");
        if (!context) return;

        setCanvasSize(canvas, context);
        loadFrames(canvas, context);
        const handleResize = () => setCanvasSize(canvas, context);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);





    return (
        <div>
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white">
                    <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-t-blue-500 border-gray-700 rounded-full animate-spin"></div>
                        <p className="mt-4 font-mono">LOADING ASSETS...</p>
                    </div>
                </div>
            )}
            <div className="relative h-screen hero-section" id='hero-section'>
                <div ref={navRef} className='fixed top-0 left-0 right-0 z-50'>
                    <Navigation />
                </div>
                <canvas
                    className={`w-full h-full absolute inset-0  ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    ref={canvasref}
                ></canvas>
                <div ref={herocontentref} className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                    <HeroContent />
                </div>
                <div className='z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-3d perspective-[1000px]'>
                    <img
                        ref={heroimgcontainerref}
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop"
                        alt="dashboard"
                        style={{ willChange: "transform,opacity" }}
                        className='w-full h-full object-cover opacity-0  translate-z-[1000px]'
                    />
                </div>
            </div>
            <OutroSection />
        </div>
    );
}

export default ScrollTrigger

const HeroContent = () => {
    const clientlogos = ["https://freepngimg.com/thumb/microsoft/28525-5-microsoft-logo-clipart.png", "https://freepngimg.com/thumb/pepsi_logo/32188-2-pepsi-logo-image.png", "https://freepngimg.com/thumb/computer/150275-logo-hewlett-packard-png-image-high-quality.png", "https://freepngimg.com/thumb/starbucks/24210-2-starbucks-logo-image.png", "https://freepngimg.com/thumb/the_legend_of_zelda/115897-logo-of-the-legend-zelda.png"];

    return (
        <div className="text-white text-center z-50 hero-content" id='hero-content'>
            <div>
                <h1 className='text-3xl sm:text-5xl font-bold max-w-4xl mx-auto bbh'>One Unified  workspace to build,test,  and ship AI faster.</h1>
                <p className='text-white/50 mt-5 uppercase bbh'>Trusted by</p>
                <div id='client-logos' className='flex flex-wrap items-center justify-center gap-10 max-w-4xl mx-auto'>
                    {clientlogos.map((item: string) => (
                        <div key={item} className='flex items-center justify-center h-12 w-32'>
                            <img
                                src={item}
                                alt="Client Logo"
                                className='max-h-full max-w-full object-contain bg-blend-difference hover:opacity-100 transition-opacity duration-300 brightness-0 invert'
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

const OutroSection = () => {

    return (
        <div className='h-screen bg-white text-black flex justify-center items-center' id='outro-section'>
            <p className='font-medium text-center text-5xl bbh'>Join teams building faster with Byewind.</p>
        </div>
    );
}