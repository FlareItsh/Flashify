<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'secondary' | 'accent' | 'outline' | 'destructive' | 'ghost' | 'link'
  size?: 'sm' | 'default' | 'lg'
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default',
  disabled: false,
  type: 'button'
})

const variantClasses = {
  default: 'bg-primary rounded-lg  text-white transition hover:opacity-90',
  secondary: 'bg-secondary rounded-lg  text-white transition hover:opacity-90',
  accent: 'bg-accent rounded-lg  text-white transition hover:opacity-90',
  destructive: 'bg-danger rounded-lg  text-white transition hover:opacity-90',
  outline:
    'border-border text-foreground hover:bg-border/20 rounded-lg border bg-transparent  transition',
  ghost: 'hover:bg-border/20 text-foreground',
  link: 'text-primary underline-offset-4 hover:underline'
}

const sizeClasses = {
  sm: 'h-8 rounded-md px-3 text-xs',
  default: 'h-auto px-6 py-3',
  lg: 'h-12 rounded-lg px-8'
}

const buttonClass = computed(() => {
  const base =
    'inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50'
  return `${base} ${variantClasses[props.variant]} ${sizeClasses[props.size]}`
})
</script>

<template>
  <button
    :class="buttonClass"
    :disabled="disabled"
    :type="type"
  >
    <slot />
  </button>
</template>
