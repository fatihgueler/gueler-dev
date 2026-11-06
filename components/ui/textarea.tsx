import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[140px] resize-y w-full rounded-none border-2 border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted focus-visible:outline-3 focus-visible:outline-offset-0 focus-visible:outline-signal aria-[invalid=true]:border-error disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
