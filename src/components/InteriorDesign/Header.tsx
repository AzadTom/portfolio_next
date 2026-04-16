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
import { useState } from "react"

const Header = () => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="w-full fixed top-0 z-50">
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
                                <Hamburger isOpen={open} toggle={() => setOpen(!open)} />
                            </SheetTrigger>

                            <SheetContent side="left" className="w-64 bg-white p-4 [&>button]:hidden">
                                <div className="flex justify-end">
                                    <SheetClose asChild>
                                        <button className="p-2 hover:bg-gray-100 rounded-full">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </SheetClose>
                                </div>
                                <div className="flex flex-col gap-6 mt-6 text-lg">
                                    <a href="#">Services</a>
                                    <a href="#">Projects</a>
                                    <a href="#">Blogs</a>
                                    <a href="#">About</a>

                                    <Button variant="outline" className="mt-4">
                                        Contact us
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
