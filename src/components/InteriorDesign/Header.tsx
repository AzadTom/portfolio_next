"use client"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import Hamburger from "./HamBurger"
import { useState, useEffect } from "react"

const Header = () => {

    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Check if scrolled past viewport height minus a small threshold (like header height)
            if (window.scrollY > window.innerHeight - 80) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Trigger once on mount
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? "bg-black/50 backdrop-blur-md" : "bg-transparent"}`}>
                <div className="max-w-7xl mx-auto flex flex-row-reverse sm:flex-row items-center justify-between px-4 py-4 md:px-8">

                    {/* Logo */}
                    <div className="flex items-center gap-2">

                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
                        <a href="#" className="hover:text-black">Services</a>
                        <a href="#" className="hover:text-black">Projects</a>
                        <a href="#" className="hover:text-black">Blogs</a>
                        <a href="#" className="hover:text-black">About</a>

                        <Button variant="outline" className="rounded-full px-5">
                            Contact us
                        </Button>
                    </div>

                    {/* Mobile Menu */}
                    <div className="md:hidden">
                        <Sheet open={open} onOpenChange={setOpen}>
                            <SheetTrigger asChild>
                                <button className="p-4 bg-[#050505] hover:bg-black transition-colors rounded-full shadow-lg flex items-center justify-center">
                                    <Hamburger isOpen={open} toggle={()=> setOpen((prev)=>(!prev))}/>
                                </button>
                            </SheetTrigger>

                            <SheetContent side="left" className="w-full sm:w-[450px] bg-[#050505] border-l border-white/5 p-8 flex flex-col justify-between [&>button]:hidden">
                                <div>
                                    <div className="flex items-center justify-between mb-16">
                                        <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-bold">Navigation</span>
                                        <SheetClose asChild>
                                            <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-colors text-white">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </SheetClose>
                                    </div>
                                    
                                    <div className="flex flex-col gap-8">
                                        {['Services', 'Projects', 'Journal', 'Studio'].map((item, i) => (
                                            <a key={item} href="#" className="flex flex-col md:flex-row md:items-end gap-2 md:gap-6 group">
                                                <span className="text-zinc-600 text-sm font-serif italic">0{i + 1}</span>
                                                <span className="text-4xl md:text-5xl font-light text-zinc-400 group-hover:text-white transition-colors tracking-tight">{item}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-12 flex flex-col gap-8">
                                    <div className="h-[1px] w-full bg-white/10" />
                                    
                                    <div className="flex items-center justify-between text-zinc-500 text-xs tracking-[0.2em] uppercase font-semibold">
                                        <a href="#" className="hover:text-white transition-colors">Instagram</a>
                                        <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                                    </div>

                                    <Button className="w-full bg-white text-black hover:bg-zinc-200 rounded-full py-6 text-sm font-semibold tracking-wide transition-transform hover:scale-[1.02] duration-300">
                                        Start a Project
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Header


function Logo(props: any) {
    return (
        <svg
            width={220}
            height={80}
            viewBox="0 0 220 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M10 10h30m-30 0v30M10 70h30m-30 0V40M210 10h-30m30 0v30M210 70h-30m30 0V40"
                stroke="#000"
                strokeWidth={3}
            />
            <path fill="#E60000" d="M50 20H70V40H50z" />
            <text
                x={80}
                y={30}
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill="#000"
            >
                {"Unity"}
            </text>
            <text x={135} y={20} fontSize={10} fill="#000">
                {"\xAE"}
            </text>
            <text
                x={80}
                y={55}
                fontFamily="Arial, sans-serif"
                fontSize={18}
                fontWeight="bold"
                fill="#000"
            >
                {"Interiors"}
            </text>
        </svg>
    )
}
