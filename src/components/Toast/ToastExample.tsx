'use client';
import { motion } from "motion/react";
import ToastProvider from "./ToastProvider"
import { toastStore } from "./toastStore";
import { Check } from "lucide-react";

const ToastExample = () => {
    const handelAdd = () => {
        toastStore.add(
            <motion.div className="flex justify-between items-center gap-5 bg-white border border-gray-200 px-4 py-2 rounded">
                <Check size={32} className="bg-green-600 text-white rounded-full p-2" />
                <div>
                    <p className="text-base font-medium">Yay! Everything worked!</p>
                    <p className="text-sm">Congrats on the internet loading your request</p>
                </div>
            </motion.div>
        );
    }

    return (
        <>
            <div className="h-screen bg-[#262626] border border-[#363636] rounded">
                <div className="w-full h-full flex justify-center items-center">
                    <button className="bg-black z-50 text-white px-12 py-4 text-base font-medium rounded-full cursor-pointer" onClick={handelAdd}>Toast</button>
                </div>
            </div>
            <ToastProvider />
        </>
    )
}

export default ToastExample