import { cn } from "@/lib/utils"
import { ReactNode } from "react"

const FormBackground = ({ children, bgImage = '', className }: { children: ReactNode, bgImage?: string, className?: string }) => {
    return (
        <div
            className={cn(className)}
            style={{
                backgroundImage: bgImage ? `url('${bgImage}')` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {children}
        </div>
    )
}

export default FormBackground