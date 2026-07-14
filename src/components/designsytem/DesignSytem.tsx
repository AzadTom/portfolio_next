'use client';
import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";



const headingVariants = cva("", {
  variants: {
    variant: {
      display: "tracking-tight text-[clamp(2.75rem,calc(1.93rem+4.08vw),4.5rem)] leading-[0.95] font-bold",
      lead:"text-[clamp(1.125rem,calc(0.95rem+0.82vw),1.5rem)]",
      title:"tracking-tight text-4xl font-bold",
      subtitle:"text-lg font-medium",
    },
  },
  defaultVariants: {
    variant: "display",
  },
});

type HeadingProps = {
  children: ReactNode;
  className?: string;
  as?:ElementType,
} & VariantProps<typeof headingVariants>;

const Heading = (props: HeadingProps) => {
  const { children, className, variant,as:Component="h1"} = props;
  return (
    <Component className={cn(headingVariants({ variant }), className)}>{children}</Component>
  );
};


const textVariants = cva("", {
  variants: {
    variant: {
      description:"text-base",
      label:"text-xs font-bold uppercase tracking-widest",
    },
  },
  defaultVariants: {
    variant: "description",
  },
});

type TextProps = {
  children: ReactNode;
  className?: string;
  as?:ElementType,
} & VariantProps<typeof textVariants>;


const Text = (props:TextProps)=>{
  const {children,className,variant,as:Component="p"} = props;
  return(
    <Component className={cn(textVariants({variant}),className)}>
      {children}
    </Component>
  )
}

export {Heading,Text,headingVariants,textVariants};


//  text-[clamp(2.75rem,calc(1.93rem+4.08vw),4.5rem)]
// text-[clamp(1.125rem,calc(0.95rem+0.82vw),1.5rem)]
