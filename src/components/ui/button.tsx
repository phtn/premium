import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl border-[1.5px] text-sm font-semibold tracking-tight ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group",
  {
    variants: {
      variant: {
        default:
          " transition-all active:scale-[95%] duration-500 bg-stone-900 text-white hover:bg-hermes hover:border-stone-900 border-stone-200 hover:text-white shadow-[1px_1px_rgba(25,23,28),2px_2px_rgba(25,23,28),3px_3px_rgba(25,23,28)]",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          " transition-all duration-500 bg-white active:scale-[95%] text-stone-900 hover:bg-hermes border-stone-900 hover:text-white hover:border-stone-900 shadow-[1px_1px_rgba(55,55,55),2px_2px_rgba(70,70,70),3px_3px_rgba(85,85,85)]",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 space-x-2",
        sm: "h-9 px-3 rounded-lg space-x-2 text-sm",
        lg: "h-11 px-8 space-x-4",
        xl: "h-12 px-8 space-x-5 text-[16px]",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
