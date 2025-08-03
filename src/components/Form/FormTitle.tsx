import { cn } from '@/lib/utils';
import React from 'react'

interface FormTitleProps {
    title: string;
    subtitle?: string;
    className?: string;
    titleClassName?: string;
    subtitleClassName?: string;
}

const FormTitle = ({ className,title,titleClassName,subtitle,subtitleClassName}: FormTitleProps) => {
    return (
        <div className={cn(className)}>
            <div className="text-center mb-8">
                <h2 className={titleClassName}>{title}</h2>
                {subtitle && <p className={subtitleClassName}>{subtitle}</p>}
            </div>
        </div>
    )
}

export default FormTitle