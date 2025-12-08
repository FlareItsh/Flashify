import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary rounded-lg px-6 py-3 text-white transition hover:opacity-90',
        destructive: 'bg-danger rounded-lg px-6 py-3 text-white transition hover:opacity-90',
        outline:
          'border-border text-foreground hover:bg-border/20 rounded-lg border bg-transparent px-6 py-3 transition',
        secondary: 'bg-secondary rounded-lg px-6 py-3 text-white transition hover:opacity-90',
        accent: 'bg-accent rounded-lg px-6 py-3 text-white transition hover:opacity-90',
        ghost: 'hover:bg-border/20 text-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
      },
      size: {
        default: 'h-auto px-6 py-3',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-12 rounded-lg px-8',
        icon: 'h-9 w-9'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
