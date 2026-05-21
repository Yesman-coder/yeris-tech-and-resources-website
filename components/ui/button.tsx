import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#E85D04] dark:bg-[#9D4EDD] text-white hover:opacity-90",
        destructive: "bg-red-500 text-white hover:bg-red-600",
        outline: "border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.06)] bg-[#FBF8F3] dark:bg-[#0A0A0F] hover:bg-[#F5F0E8] dark:hover:bg-[#14141C] text-[#1A1A1A] dark:text-[#F5F5F7]",
        secondary: "bg-[#F5F0E8] dark:bg-[#14141C] text-[#1A1A1A] dark:text-[#F5F5F7] hover:opacity-80",
        ghost: "hover:bg-[#F5F0E8] dark:hover:bg-[#14141C] text-[#1A1A1A] dark:text-[#F5F5F7]",
        link: "text-[#E85D04] dark:text-[#9D4EDD] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
