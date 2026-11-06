import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Brutalist-Buttons: 2px-Rahmen, Radius 0, harter Offset-Schatten.
 * Hover = Verschiebung + Inversion, nie Glow.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-none border-2 border-foreground font-mono text-sm font-bold uppercase tracking-[0.06em] transition-[transform,box-shadow,background-color,color] duration-[90ms] ease-linear disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-signal text-on-signal shadow-[4px_4px_0_0_var(--color-foreground)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-foreground)] active:translate-x-1 active:translate-y-1 active:shadow-none",
        gold:
          "bg-foreground text-background hover:bg-signal hover:text-on-signal",
        outline:
          "bg-transparent text-foreground hover:bg-foreground hover:text-background",
        ghost: "border-transparent text-foreground hover:border-foreground",
      },
      size: {
        default: "min-h-12 px-6 py-3",
        sm: "min-h-11 px-4 py-2 text-xs",
        lg: "min-h-14 px-7 py-4 text-sm md:text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
