import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-[var(--radius)] border border-border bg-surface px-4 py-2 text-base text-foreground transition-colors duration-300 placeholder:text-muted-2 focus-visible:border-violet-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-2/40 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
