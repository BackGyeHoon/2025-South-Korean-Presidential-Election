import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90",
        defaultLight:
          "bg-primary text-white hover:bg-primary/90 border border-white bg-white text-black font-medium",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        taeguk: `
          relative bg-white font-semibold text-black overflow-hidden 
          border-2 border-[#000000] 
          transition-all duration-300
          shadow-md
          hover:shadow-md
          [&>span]:relative [&>span]:z-10
          before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:w-10 before:h-10
          before:-translate-x-1/2 before:-translate-y-1/2
          before:bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'%3E%3Cpath fill='none' d='M0 0h24v24H0z'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-5-8.5C7 8.567 9.077 6 12 6s5 2.567 5 5.5c0 1.458-.655 2.8-1.678 3.672l-.207-.404c.504-.909.785-1.9.785-3.268 0-2.744-1.738-4.5-3.9-4.5-1.245 0-2.345.553-3.088 1.501-.15 1.176-.853 2.188-1.912 2.853V11.5zM12 18c-2.9 0-5-2.144-5-5 0-1.537.555-2.748 1.413-3.662l.212.388c-.859.924-1.425 2.206-1.425 3.774 0 2.744 1.738 4.5 3.9 4.5 1.369 0 2.573-.675 3.286-1.794.245-.998.926-1.723 1.914-2.173.117.755.2 1.535.2 2.467 0 2.856-2.1 5-5 5z' fill='%23003478'/%3E%3Cpath d='M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1.984-13.09c.816.066 1.533.261 2.182.654A4.294 4.294 0 0 1 17.5 9.5c0 2.43-2.154 4.487-4.984 4.574v-2.167A2.254 2.254 0 0 0 14.756 9.7c0-.313-.158-.65-.484-.941-.267-.238-.744-.492-1.488-.574v-2.275zm-3.968.09v2.255c-.745.082-1.222.336-1.488.574-.326.291-.484.628-.484.94C7.044 8.986 7.93 9.8 9.016 9.908v2.166C6.186 11.987 4 9.93 4 7.5c0-.655.18-1.251.515-1.793.65-.393 1.325-.59 2.15-.658l.33-.048 3.022-.001z' fill='%23CD2E3A'/%3E%3C/svg%3E")]
          before:bg-no-repeat before:bg-contain
          before:transition-opacity before:duration-300 before:opacity-40
          hover:before:opacity-100
        `,
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
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
      >
        <span>{props.children}</span>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
