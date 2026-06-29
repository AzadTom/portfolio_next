import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const headingVariants = cva("", {
  variants: {
    variant: {
      heading: "tracking-tight text-[clamp(2.75rem,calc(1.93rem+4.08vw),4.5rem)] leading-[0.95] font-medium max-w-4xl",
      subheading:"text-[clamp(1.125rem,calc(0.95rem+0.82vw),1.5rem)] leading-relaxed max-w-2xl"
    },
  },
  defaultVariants: {
    variant: "heading",
  },
});

type HeadingProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof headingVariants>;

export const Heading = (props: HeadingProps) => {
  const { children, className, variant } = props;
  return (
    <h1 className={cn(headingVariants({ variant }), className)}>{children}</h1>
  );
};
