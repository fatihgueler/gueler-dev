import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97] [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-violet text-white font-semibold hover:bg-violet-2 hover:shadow-[0_10px_40px_-10px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 active:translate-y-0",
        gold:
          "bg-cyan text-background font-semibold hover:bg-cyan-2 hover:shadow-[0_10px_40px_-10px_rgba(6,182,212,0.55)] hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-border-strong text-foreground hover:border-violet-2 hover:text-violet-3 bg-transparent",
        ghost: "text-muted hover:text-foreground hover:bg-surface",
      },
      size: {
        default: "h-11 px-7",
        sm: "h-9 px-5 text-sm",
        lg: "h-14 px-9 text-base",
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
