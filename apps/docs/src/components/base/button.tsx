import React from "react";
import { tv, VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: [
    "px-4 rounded-md py-2 text-center",
    "flex items-center justify-center gap-x-4",
    "font-medium",
    "active:scale-[.96]",
  ],
  variants: {
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
    loading: {
      true: "animate-pulse",
    },
    size: {
      sm: "px-2 py-1.5 text-sm",
      default: "px-4 py-2",
      lg: "px-6 py-4",
    },
    variant: {
      solid: "text-white bg-primary-600 hover:bg-primary-500",
      ghost: "text-primary-600 bg-transparent hover:bg-primary-500",
    },
  },
  defaultVariants: {
    size: "default",
    disabled: false,
    loading: false,
    variant: "solid",
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;
export type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  ButtonVariants;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, loading, disabled, ...props }, ref) => (
    <button
      {...props}
      ref={ref}
      disabled={disabled || (loading as boolean)}
      className={buttonVariants({
        variant,
        className,
        disabled,
        loading,
        size,
      })}
    >
      {props.children}
    </button>
  )
);

Button.displayName = "Button";

export default Button;
