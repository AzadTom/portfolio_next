'use client';
import { motion } from 'motion/react';
import React, { ReactNode } from 'react'

const FormContainer = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <motion.div
            id='contact-me'
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
            className={className}>{children}</motion.div>
    )
}

export default FormContainer