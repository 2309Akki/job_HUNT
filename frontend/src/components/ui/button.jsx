import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow-md hover:bg-primary/90",
        destructive: "bg-red-600 text-white shadow-md hover:bg-red-700",
        outline: "border border-gray-300 bg-white hover:bg-gray-100",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        ghost: "hover:bg-gray-100",
        link: "text-blue-600 underline-offset-4 hover:underline",
        soft: "bg-gray-100 text-gray-800 hover:bg-gray-200", // ✨ New soft variant
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-10 px-6 text-lg",
        icon: "size-9",
      },
      fullWidth: {
        true: "w-full", // ✨ New full-width option
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      fullWidth: false,
    },
  }
);

function Button({ className, variant, size, fullWidth, loading, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, fullWidth, className }))}
      disabled={props.disabled || loading}
      aria-disabled={props.disabled || loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-5 w-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      )}
      {props.children}
    </Comp>
  );
}

export { Button, buttonVariants };
