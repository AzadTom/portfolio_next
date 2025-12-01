'use client';
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import {motion } from 'motion/react';

const FormBackground = ({ children, bgImage = '', className }: { children: ReactNode, bgImage?: string, className?: string }) => {
    return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className={cn(className)}
            style={{
                backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {children}
        </motion.div>
    )
}

export default FormBackground