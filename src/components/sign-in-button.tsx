import * as React from 'react'

import { SignInButton as ClerkSignInButton } from '@clerk/nextjs'
import { type VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const SignInButton = React.forwardRef<HTMLDivElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <ClerkSignInButton />
      </div>
    )
  }
)
SignInButton.displayName = 'SignInButton'

export { buttonVariants, SignInButton }
