import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap outline-none transition-colors duration-150 ease-power3-out focus-visible:ring-2 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-btn-primary hover:bg-primary/90",
        ink: "bg-ink text-ink-foreground shadow-btn-ink hover:bg-ink/85",
        secondary: "bg-card text-foreground shadow-btn hover:bg-raised",
        ghost: "text-soft hover:bg-hover hover:text-foreground",
      },
      size: {
        sm: "px-3 py-2 text-[14px] leading-none",
        md: "px-4 py-2.5 text-[14px]",
        lg: "px-5 py-3 text-[15px]",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonProps = ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & { asChild?: boolean };

export function Button({
  className,
  variant,
  size,
  asChild = false,
  type = "button",
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";
  return (
    <Component
      {...(asChild ? {} : { type })}
      {...props}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
}

export { buttonVariants };
